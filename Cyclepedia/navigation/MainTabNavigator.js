import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginStack.navigationOptions = {
  // title: 'Login',
  // headerStyle: {
  //     backgroundColor: 'red'
  // },
  // headerTitleStyle: {
  //     color: 'green'
  // },
  tabBarLabel: "Login",
  tabFontSize: 40
  //tabBar: {
    //tabFontSize: 40,
    //tabStyle: { backgroundColor: "red" }
  //}
  // appStyle: {
  //     tabBarBackgroundColor: '#0f2362',
  //     tabBarButtonColor: '#ffffff',
  //     tabBarHideShadow: true,
  //     tabBarSelectedButtonColor: '#63d7cc',
  //     tabBarTranslucent: false,
  //     tabFontSize: 40,
  //     selectedTabFontSize: 12,
  //   },
};

const RegisterStack = createStackNavigator({
  Register: RegisterScreen
});

RegisterStack.navigationOptions = {
  // title: 'Register',
  // headerStyle: {
  //     backgroundColor: 'red'
  // },
  // headerTitleStyle: {
  //     color: 'green'
  // },
  tabBarLabel: "Register",
  tabFontSize: 40
  // appStyle: {
  //     tabBarBackgroundColor: '#0f2362',
  //     tabBarButtonColor: '#ffffff',
  //     tabBarHideShadow: true,
  //     tabBarSelectedButtonColor: '#63d7cc',
  //     tabBarTranslucent: false,
  //     tabFontSize: 40,
  //     selectedTabFontSize: 12,
  //   },
};

export default createBottomTabNavigator({
  LoginStack,
  RegisterStack
});
