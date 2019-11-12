import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Start from './Screens/Start';
import Login from './Screens/Login';
import Profile from './Screens/Profile';

const App = createStackNavigator({
  Start: { screen: Start }, 
  Login: { screen: Login },
  Profile: { screen: Profile },
  Dashboard: { screen: Dashboard }
},
{
  initialRouteName: 'Start',
}

);

export default createAppContainer(App);
