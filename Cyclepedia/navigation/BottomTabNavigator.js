import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import StatsScreen from '../screens/StatsScreen';
import RideScreen from '../screens/RideScreen';

const StatsStack = createStackNavigator({
    Stats: StatsScreen,
});

StatsStack.navigationOptions = {
    tabBarLabel: 'Stats',
    tabFontSize: 40
};

const RideStack = createStackNavigator({
    Ride: RideScreen,
});

RideStack.navigationOptions = {
    tabBarLabel: 'Ride',
    tabFontSize: 40
};

export default createBottomTabNavigator({
    StatsStack,
    RideStack,
});