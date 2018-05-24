import React, {Component} from 'react';
import {View, StyleSheet, Button, ScrollView, AsyncStorage} from 'react-native';
import colorStyles from '../constants/colors';

var user = {
    email: null,
    username: null,
    firstName: null,
    password: null,
    contactName: null,
    contactPhone: null,
    contactEmail: null,
    rides: []
};

var t = require('tcomb-form-native');
const Form = t.form.Form;

var crypto = require("crypto-js");

const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return reg.test(email);
});

const Phone = t.refinement(t.String, contactPhone => {
    const phonePattern = /^(1?\([0-9]{3}\)( |)|(1-|1)?[0-9]{3}-?)[0-9]{3}-?[0-9]{4}$/gmi;
    return phonePattern.test(contactPhone);
});

function comparePass(currentUser) {
    return currentUser.password === currentUser.confirmPassword;
}

const formStyles = {
    ...Form.stylesheet,
    controlLabel: {
        normal: {
            color: colorStyles.black,
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        error: {

            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        button: {
            backgroundColor: colorStyles.green,
            borderColor: colorStyles.green,
        },
    }
}

encrypt = passwrd => {
    console.log("in encrypt");

    var unencrypt = 'bacon';

    var ciphertext = crypto.AES.encrypt(passwrd, 'secret key 123');
    console.log("encrypted text", ciphertext.toString());

    var bytes = crypto.AES.decrypt(ciphertext.toString(), 'secret key 123');
    var plaintext = bytes.toString(crypto.enc.Utf8);
    console.log("decrypted text", plaintext);

    return ciphertext.toString();
}

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        title: 'Register',
    };

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };

        const passMatch = t.refinement(t.String, (s) => {
            //console.log("match? ", s == this.state.user.password);
            return s == this.state.user.password;
        });

        this.User = t.struct({
            email: Email,
            username: t.maybe(t.String),
            firstName: t.String,
            password: t.String,
            confirmPassword: passMatch,
            contactName: t.String,
            contactPhone: t.maybe(Phone),
            contactEmail: Email
        });

        this.options = {
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
                confirmPassword: {
                    error: 'Passwords must match',
                    secureTextEntry: true
                },
                contactName: {
                    error: 'You must enter your emergency contact\'s name'
                },
                contactEmail: {
                    error: 'You must enter a valid email address for your emergency contact'
                },
            },
            stylesheet: formStyles,
        };
        this.validate = null;
    }

    onChange(user) {
        const formData = this._form.getValue();
        this.setState({user});
        if (formData != null) {
            this.validate = this._form.getValue();
        }
        // if (user.confirmPassword != null && user.confirmPassword != "") {
        //     this.validate = this._form.getValue();
        // }
    }

    handleSubmit = () => {
        const userData = this._form.getValue();
        console.log('userData: ', userData);

        if (userData != null) {
            console.log("in encrypt block");
            console.log('pass:', userData.password);
            const userPass = userData.password;

            var passHash = encrypt(userPass);

            console.log("pass hash ", passHash);
            userData.password = passHash;

            //persist user from here
            user.email = userData.email;
            user.username = userData.username;
            user.password = userData.password;
            user.firstName = userData.firstName;
            user.contactEmail = userData.contactEmail;
            user.contactName = userData.contactName;
            user.contactPhone = userData.contactPhone;

            AsyncStorage.setItem(user.email.toString(), JSON.stringify(user)).then(this.props.navigation.navigate("Bottom"));

        }
    }

    render() {
        return (

            <View style={styles.container}>
                <ScrollView>
                    <Form
                        ref={c => this._form = c}
                        type={this.User}
                        value={this.state.user}
                        onChange={(u) => this.onChange(u)}
                        options={this.options}
                    />
                    <Button
                        title="Sign Up"
                        disabled={this.validate ? false : true}
                        onPress={this.handleSubmit}
                    />
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});



