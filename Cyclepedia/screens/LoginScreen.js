import React from 'react';
import {View, ScrollView, StyleSheet, AsyncStorage, Button, Text} from 'react-native';
import colorStyles from '../constants/colors';
import {AppLoading} from 'expo';

var crypto = require("crypto-js");

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

decrypt = passwrd => {
    var bytes = crypto.AES.decrypt(passwrd.toString(), 'secret key 123');
    var plaintext = bytes.toString(crypto.enc.Utf8);
    return plaintext;
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

export var UserObject = '';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    state = {
        userMessage: "",
    }

    async getUser(userData) {
        try {
            var u = null;
            const value = await AsyncStorage.getItem(userData.email.toString()).then((keyValue) => {
                u = keyValue
            }, (error) => {
                console.log(error);
                this.setState({userMessage: "Error retrieving user data, please try again."});
            }).then(function () {
                if (u != null) {
                    // user exists, hash password in form, compare the returned users hashed password
                    u = JSON.parse(u);
                    const decryptedPassword = decrypt(u.password);
                    UserObject = u;
                    if (decryptedPassword == userData.password) {
                        console.log("Passwords matched");
                        this.props.navigation.navigate("Bottom");
                    } else {
                        console.log("Incorrect Password");
                        this.setState({userMessage: "Incorrect password, please try again."});
                    }
                } else {
                    this.setState({userMessage: "User doesn't exists, please register."});
                }
            }.bind(this));

        } catch (error) {
            console.log("Error retrieving user data, please try again.");
            console.log(error);
            this.setState({userMessage: "Error retrieving user data, please try again."});
        }
    }

    handleLogin = () => {
        const userData = this._form.getValue();

        if (userData != null) {
            var user = this.getUser(userData);
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
                    <Text style={styles.error}>{this.state.userMessage}</Text>
                </View>
            </ScrollView>
        );
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
    error: {
        color: "red",
    }
});