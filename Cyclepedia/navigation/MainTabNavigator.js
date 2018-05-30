import React from "react";
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
//import colorStyles from './constants/colors';

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused, tintColor }) => {
    <MaterialCommunityIcons name={`login`} size={25} color={tintColor} />;
    },
    tabBarOptions: {
      activeTintColor: '#69A197',
      inactiveTintColor: 'gray',
      paddingBottom: 20,
      fontSize: 100
    },
};

const RegisterStack = createStackNavigator({
  Register: RegisterScreen
});

RegisterStack.navigationOptions = {
  tabBarLabel: "Register",
  tabBarIcon: ({ focused, tintColor }) => {
    <MaterialIcons name={`add-circle`} size={25} color={tintColor} />;
    },
    tabBarOptions: {
      activeTintColor: '#69A197',
      inactiveTintColor: 'gray',
      paddingBottom: 20,
      fontSize: 100
    },
};

export default createBottomTabNavigator({
  LoginStack,
  RegisterStack
});
