import React, {
    Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';
import {
    colorStyles
} from '../constants/colors';

// import bcrypt from 'react-native-bcrypt';
const bcrypt = require('react-native-bcrypt');
//import isaac from "isaac";
//var bcrypt = require('bcryptjs');
//var bcrypt = require("react-native-bcrypt");

var t = require('tcomb-form-native');
const Form = t.form.Form;

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
        }
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

test = () => {
    console.log("in test");
    var unencrypt = 'bacon';
    // var passHash = bcrypt.hashSync('bacon', 8);
    // console.log("hashed: ", passHash);

    // bcrypt.genSalt(10, function (err, salt) {
    // });

    bcrypt.hash(unencrypt, 10, function (err, hash) {
        //unencrypt = hash;
        console.log(hash);
        bcrypt.compare(unencrypt, hash, function (err, res) {
            console.log("before hash: ", unencrypt);
            console.log("hashed: ", unencrypt);
            console.log("T/F: ", res);

            // if (res == true) {
            //   userData.password = passHash;
            //   //send user to persistence
            // }
        });
    });
}

export class RegisterScreen extends Component {
    handleSubmit = () => {
        const userData = this._form.getValue();
        console.log('userData: ', userData);

        if (userData != null) {
            console.log("in encrypt block");
            console.log('pass:', userData.password);
            const userPass = userData.password;
            test();

            var passHash;
        }

        // var passHash = bcrypt.hashSync('bacon', 8);

        // console.log("hashed: ", passHash);

        // bcrypt.compare('bacon', passHash, function (err, res) {
        //       console.log("T/F: ", res);
        // });

        // bcrypt.setRandomFallback((len) => {
        //   const buf = new Uint8Array(len);
        //   return buf.map(() => Math.floor(isaac.random() * 256));
        // });

        // var passHash;
        // //var hash = bcrypt.hash('bacon', 8);
        // bcrypt.hash('bacon', 8, function (err, hash) {
        //   passHash = hash;
        // });

        // console.log("hashed: ", passHash);

        // bcrypt.compare('bacon', passHash, function (err, res) {
        //       console.log("T/F: ", res);
        // });

        // const hash = bcrypt.hashSync(...)
        // bcrypt.hash(userPass, 8, function (err, hash) {
        //   passHash = hash;
        //   hashDone(userPass);
        // });
        // hashDone = userPass => {
        //   console.log('Hash Done: ' + passHash);
        //   bcrypt.compare(userPass, passHash, function (err, res) {
        //     console.log("T/F: " + res);
        //   });
        // }
    }

    render() {
        return (
            <View style={styles.container}>
              <Form
                  ref={c => this._form = c}
                  type={User}
                  options={options}
              />
              <Button
                  title="Sign Up"
                  onPress={this.handleSubmit}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: colorStyles.white,
    },
});

