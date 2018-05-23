import React from 'react';
import {createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import BottomTabNavigator from "./BottomTabNavigator";

const AppNavigator = createSwitchNavigator(
    {
        Main: MainTabNavigator,
        Bottom: BottomTabNavigator,
    },
    {
        initialRouteName: 'Main',
    }
);

export default class RootNavigation extends React.Component {

    render() {
        return ( <AppNavigator/>);
    }
}
