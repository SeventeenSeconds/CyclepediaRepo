import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { MapTest } from './MapTest';
//import { Map } from './Map';
import { Geolocation } from './Geolocation';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Geolocation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
