import React from 'react';
import {createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import TopTabNavigator from './TopTabNavigator';

const AppNavigator = createSwitchNavigator(
    {
        Main: MainTabNavigator,
        Bottom: BottomTabNavigator,
        // Top: TopTabNavigator
    },
    {
        initialRouteName: 'Main',
    }
);

export default class RootNavigation extends React.Component {

    render() {
        return ( <AppNavigator /> );
    }
}
