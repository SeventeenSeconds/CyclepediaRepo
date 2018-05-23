import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import colorStyles from '../constants/colors';

// var bcrypt = require('bcryptjs');
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
      error: 'You must enter a password'
    },
    contactName: {
      error: 'You must enter your emergency contact\'s name'
    },
    contactEmail: {
      error: 'You must enter a valid email address for your emergency contact'
    },
  },
};

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

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

export default class RegisterScreen extends React.Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
    //send to bcrypt?
  }
  
  render() {
    return (
        <ScrollView>
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c}
          type={User} 
        />
        <Button
          title="Sign Up"
          onPress={this.handleSubmit}
        />
      </View>
        </ScrollView>
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