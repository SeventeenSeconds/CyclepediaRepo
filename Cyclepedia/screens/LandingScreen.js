import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import colorStyles from '../constants/colors';
import EmergencyIcon from '../constants/EmergencyIcon';
import {FontAwesome} from '@expo/vector-icons';

export default class LandingScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        headerRight: <EmergencyIcon />,
    };

    render() {
        var user = this.props.navigation.getParam('user','default');
      return (
          <ScrollView>
              <View style={styles.container}>
                  <Text>Welcome {user.firstName}!</Text>
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