import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {FontAwesome} from '@expo/vector-icons';
import StatsScreen from '../screens/StatsScreen';
import RideScreen from '../screens/RideScreen';
import LandingScreen from '../screens/LandingScreen';

const StatsStack = createStackNavigator({
    Stats: StatsScreen,
});

StatsStack.navigationOptions = {
    tabBarLabel: 'Stats',
    tabBarIcon: ({focused, tintColor}) => {
        <FontAwesome name={`bar-chart`} size={25} color={tintColor}/>;
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
    tabBarIcon: ({focused, tintColor}) => {
        <FontAwesome name={`bicycle`} size={25} color={tintColor}/>;
    },
    tabBarOptions: {
        activeTintColor: '#69A197',
        inactiveTintColor: 'gray',
        paddingBottom: 20,
        fontSize: 100
    },
};

const SettingsStack = createStackNavigator({
   Settings: LandingScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused, tintColor}) => {
        <FontAwesome name={`bicycle`} size={25} color={tintColor}/>;
    },
    tabBarOptions: {
        activeTintColor: '#69A197',
        inactiveTintColor: 'gray',
        paddingBottom: 20,
        fontSize: 100
    },
}

export default createBottomTabNavigator({
    StatsStack,
    RideStack,
    SettingsStack,
});