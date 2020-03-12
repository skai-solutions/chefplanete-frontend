import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import Start from './Screens/Start';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import ManageProfile from './Screens/ManageProfile';
import Dashboard from './Screens/Dashboard';
import Search from './Screens/Search';
import MyFridge from './Screens/MyFridge';
import store from "./store";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import OCRCamera from "./Screens/OCRCamera";
import CameraLoading from "./Screens/CameraLoading";
import CameraResults from "./Screens/CameraResults";
import ManageGoals from "./Screens/manageGoals/ManageGoals";
import RecipeDisplay from "./Screens/RecipeDisplay"

const MainNavigator = createStackNavigator({
    Start: {screen: Start},
    Login: {screen: Login},
    Profile: {screen: Profile},
    ManageProfile: {screen: ManageProfile},
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Search: {screen: Search},
    ManageGoals: {screen: ManageGoals},
    MyFridge: {screen: MyFridge},
    OCRCamera: {screen: OCRCamera},
    CameraLoading: {screen: CameraLoading},
    CameraResults: {screen: CameraResults},
    RecipeDisplay: {screen: RecipeDisplay},
  },

  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(MainNavigator);

const state = store.getState();

const App = () => {
  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }, []);
  return (
    <StyleProvider style={getTheme(material)}>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </StyleProvider>
  );
};


export default App;
