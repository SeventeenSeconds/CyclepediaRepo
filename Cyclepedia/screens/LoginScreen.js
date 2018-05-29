import React from 'react';
import { View, ScrollView, StyleSheet, AsyncStorage, Button } from 'react-native';
import colorStyles from '../constants/colors';
import {AppLoading} from 'expo';

var t = require('tcomb-form-native');
const Form = t.form.Form;

const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return reg.test(email);
});

const User = t.struct({
    email: Email,
    username: t.maybe(t.String),
    password: t.String,
});

const options = {
    fields: {
        email: {
            error: 'You must enter a valid email address'
        },
        firstName: {
            error: 'You must enter your first name'
        },
        password: {
            error: 'You must enter a password',
            secureTextEntry: true
        },
    },
    stylesheet: formStyles,
};

function comparePass(currentUser) {
    return currentUser.password === currentUser.confirmPassword;
}

const formStyles = {
    ...Form.stylesheet,
    controlLabel: {
        normal: {
            color: colorStyles.blue,
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    user = null;

    async getUser(userData){
        try {
            const value = await AsyncStorage.getItem(userData.email.toString()).then((keyValue) => {
                this.user = keyValue}, (error) => {
                console.log(error)
            });
            if (this.user == null){
                // User isn't found, create message to register
                console.log("value is null");
            }
            console.log(this.user);
        } catch (error) {
            // internal fail
        }
    }

    handleLogin = () => {
        const userData = this._form.getValue();
        console.log('userData: ', userData);

        if (userData != null) {
            // console.log("in encrypt block");
            // console.log('pass:', userData.password);
            // const userPass = userData.password;
            // test();
            //
            // var passHash;

            // pulls user

            const user = this.getUser(userData);

            console.log(user);
            this.props.navigation.navigate('Bottom');
        }

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Form
                        ref={c => this._form = c}
                        type={User}
                        options={options}
                    />
                    <Button
                        title="Login"
                        onPress={this.handleLogin}
                    />
                </View>
            </ScrollView>
        );
    }

    authenticatedUser = () => {
        this.props.navigation.navigate('Bottom');
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: colorStyles.white,
    },
});