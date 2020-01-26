import React from 'react';
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
import Dashboard from './Screens/Dashboard';
import Search from './Screens/Search';
import MyFridge from './Screens/MyFridge';
import VerifyIdentifiedIngredients from './Screens/VerifyIdentifiedIngredients';
import OCRCamera from  './Screens/OCRCamera';
import CameraLoading from "./Screens/CameraLoading";
import ReceiptScanned from "./Screens/ReceiptScanned";
import store from "./store";
import { Provider } from "react-redux";

const MainNavigator = createStackNavigator({
    Start: {screen: Start},
    Login: {screen: Login},
    Profile: {screen: Profile},
    Dashboard: {screen: Dashboard},
    Search: {screen: Search},
    MyFridge: {screen: MyFridge},
    VerifyIdentifiedIngredients: {screen: VerifyIdentifiedIngredients},
    OCRCamera: {screen: OCRCamera},
    CameraLoading: {screen: CameraLoading},
    ReceiptScanned: {screen: ReceiptScanned},
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
    <StyleProvider style={getTheme(material)}>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </StyleProvider>
  );
};


export default App;
