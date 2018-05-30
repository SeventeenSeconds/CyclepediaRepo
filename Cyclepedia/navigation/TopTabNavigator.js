import React, { Component } from 'react';
import { Button, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
//import colorStyles from './constants/colors';

import LandingScreen from '../screens/LandingScreen';
//import EmergencyPopup from '../screens/RideScreen';

export default TabNavigator(
  {
    Home: { screen: LandingScreen },
    //Emergency: { screen: EmergencyPopup },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Emergency') {
          iconName = `exclamation-circle`;
        }
        return <FontAwesome name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: '#69A197',
      inactiveTintColor: 'gray',
      paddingBottom: 20,
      fontSize: 100
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);