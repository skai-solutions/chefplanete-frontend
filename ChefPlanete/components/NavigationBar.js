import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Button, Footer, FooterTab, Icon, StyleProvider, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import StyleVars from '../styles/variables';

const NavigationBar = ({ navigation, currentScreen }) => {
  const { replace } = navigation;
  return(
    <Footer style={{backgroundColor: StyleVars.background}}>
      <FooterTab>
        <Button light onPress={()=> replace('Dashboard')}>
          <Icon style={{
            color: currentScreen === "DASH" ? StyleVars.brandColor : "black",
          }} name="paper" />
          <Text>Dash</Text>
        </Button>
        <Button light onPress={()=> replace('MyFridge')}>
          <Icon style={{
            color: currentScreen === "FRIDGE" ? StyleVars.brandColor : "black",
          }} name="nutrition" />
          <Text>Fridge</Text>
        </Button>
        <Button light onPress={() => replace('OCRCamera')}>
          <Icon style={{
            color: currentScreen === "CAMERA" ? StyleVars.brandColor : "black",
          }} name="camera" />
          <Text>Scan</Text>
        </Button>
        <Button light onPress={()=> replace('Search')}>
          <Icon style={{
            color: currentScreen === "SEARCH" ? StyleVars.brandColor : "black",
          }} name="search" />
          <Text>Search</Text>
        </Button>
        <Button light onPress={()=> replace('Profile')}>
          <Icon style={{
            color: currentScreen === "PROFILE" ? StyleVars.brandColor : "black",
          }} name="person" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  )
};

const styles = StyleSheet.create({
  button: {

  },
});

export default withNavigation(NavigationBar);