import React from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import colorStyles from '../constants/colors';
import EmergencyIcon from '../constants/EmergencyIcon';

export default class LandingScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        headerRight: <EmergencyIcon />,
    };
    
    render() {
      return (
          <ScrollView>
              <View style={styles.container}>
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
});