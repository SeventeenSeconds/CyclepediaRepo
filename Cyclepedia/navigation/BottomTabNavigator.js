import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
//import colorStyles from './constants/colors';

import StatsScreen from '../screens/StatsScreen';
import RideScreen from '../screens/RideScreen';

const StatsStack = createStackNavigator({
    Stats: StatsScreen,
});

StatsStack.navigationOptions = {
    tabBarLabel: 'Stats',
    tabBarIcon: ({ focused, tintColor }) => {
    return <FontAwesome name={`bar-chart`} size={25} color={tintColor} />;
    },
    tabBarOptions: {
      activeTintColor: '#69A197',
      inactiveTintColor: 'gray',
      paddingBottom: 20,
      fontSize: 100
    },
};

const RideStack = createStackNavigator({
    Ride: RideScreen,
});

RideStack.navigationOptions = {
    tabBarLabel: 'Ride',
    tabBarIcon: ({ focused, tintColor }) => {
    return <FontAwesome name={`bicycle`} size={25} color={tintColor} />;
    },
    tabBarOptions: {
      activeTintColor: '#69A197',
      inactiveTintColor: 'gray',
      paddingBottom: 20,
      fontSize: 100
    },
};

export default createBottomTabNavigator({
    StatsStack,
    RideStack,
});