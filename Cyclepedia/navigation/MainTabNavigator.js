import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const LoginStack = createStackNavigator({
    Login: LoginScreen,
});

LoginStack.navigationOptions = {
    tabBarLabel: 'Login',
};

const RegisterStack = createStackNavigator({
    Register: RegisterScreen,
});

RegisterStack.navigationOptions = {
    tabBarLabel: 'Register',
};

export default createBottomTabNavigator({
    LoginStack,
    RegisterStack,
});

