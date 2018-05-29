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

function comparePass(currentUser) {
    return currentUser.password === currentUser.confirmPassword;
}

encrypt = passwrd => {

    var ciphertext = crypto.AES.encrypt(passwrd, 'secret key 123');
    console.log("encrypted text", ciphertext.toString());

    var bytes = crypto.AES.decrypt(ciphertext.toString(), 'secret key 123');
    // var plaintext = bytes.toString(crypto.enc.Utf8);
    console.log("decrypted text " + bytes);

    return ciphertext.toString();
}

decrypt = passwrd => {
    var bytes = crypto.AES.decrypt(passwrd, 'secret key 123');
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

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    user = null;

    state = {
        userMessage: "",
        userLoggedIn: false,
    }

    async getUser(userData) {
        try {
            var u = null;
            const value = await AsyncStorage.getItem(userData.email.toString()).then((keyValue) => {
                u = keyValue}, (error) => {
                console.log(error);
                this.setState({userMessage: "Error retrieving user data, please try again."});
            });

            if (u != null) {
                // user exists, hash password in form, compare the returned users hashed password
                console.log("validating password")
                this.validatePassword(u, userData.password);
            } else {
                //TODO: User doesn't exist, please register
                console.log("User doesn't exists, please register");
            }
        } catch (error) {
            console.log("Error retrieving user data, please try again.");
            console.log(error);
            //TODO: Set message
        }
    }

    validatePassword(userPromise, userPassword) {
        userPromise = JSON.parse(userPromise);
        const decryptedPassword = decrypt(userPromise.password);
        console.log("Decrypted " + decryptedPassword + " userpass " + userPassword);
        if (decryptedPassword == userPassword ) {
            //TODO: user logged in, navigate to bottom tab
            console.log("Successfully logged in!");
            // this.setState({userCreated: true});
        } else {
            //TODO: wrong password, try again
            console.log("wrong password, try again");

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

            // console.log(user);
            if (this.state.userLoggedIn) {
                this.props.navigation.navigate('Bottom');
            }
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
    error: {
        color: "red",
    }
});