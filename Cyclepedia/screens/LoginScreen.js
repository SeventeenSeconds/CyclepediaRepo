import React from 'react';
import { View, ScrollView, StyleSheet, AsyncStorage, Button } from 'react-native';
import colorStyles from '../constants/colors';

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
    state = {
        'user': '',
    }

    static navigationOptions = {
        title: 'Login',
    };

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
            AsyncStorage.getItem(userData.email).then((value) => this.setState({ 'user': value }));
            console.log(this.state.user);
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
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});