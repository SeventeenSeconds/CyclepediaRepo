import React, {
    Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    ScrollView
} from 'react-native';
import colorStyles from '../constants/colors';

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

const User = t.struct({
    email: Email,
    username: t.maybe(t.String),
    firstName: t.String,
    password: t.String,
    contactName: t.String,
    contactPhone: t.maybe(Phone),
    contactEmail: Email
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
        contactName: {
            error: 'You must enter your emergency contact\'s name'
        },
        contactEmail: {
            error: 'You must enter a valid email address for your emergency contact'
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
        },
        button: {
            backgroundColor: colorStyles.green,
            borderColor: colorStyles.green,
        },
    }
}

// if (confirmPassword(userData) != true) {
//   t.update(options, {
//     fields: {
//       confirmPassword: {
//         hasError: { $set: true },
//         error: { $set: 'Passwords must match' }
//       }
//     }
//   });
// }

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
        }
    }

    render() {
        return (
            <View style={styles.container}>
            <ScrollView>
              <Form
                  ref={c => this._form = c}
                  type={User}
                  options={options}
              />
              <Button
                  title="Sign Up"
                  onPress={this.handleSubmit}
              />
              </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: colorStyles.white,
    },
});