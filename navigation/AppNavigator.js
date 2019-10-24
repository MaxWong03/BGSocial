import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/authLoadingScreen'

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    
    // AuthLoading: AuthLoadingScreen, If I en able this the app will just be loading
    Main: MainTabNavigator,
    Auth: AuthNavigator

  },
  {
    initialRouteName: 'Auth', 
  }
));
