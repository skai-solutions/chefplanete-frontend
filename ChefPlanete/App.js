import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Start from './Screens/Start';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Dashboard from './Screens/Dashboard';
import Search from './Screens/Search';
import MyFridge from './Screens/MyFridge';
import VerifyPantry from './Screens/VerifyPantry';
import store from "./store";
import { Provider } from "react-redux";

const MainNavigator = createStackNavigator({
    Start: {screen: Start},
    Login: {screen: Login},
    Profile: {screen: Profile},
    Dashboard: {screen: Dashboard},
    Search: {screen: Search},
    MyFridge: {screen: MyFridge},
    VerifyPantry: {screen: VerifyPantry},
  },

  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(MainNavigator);

const state = store.getState();

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  );
};


export default App;
