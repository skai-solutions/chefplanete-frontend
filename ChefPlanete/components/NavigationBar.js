import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Button, Footer, FooterTab, Icon, StyleProvider, Text, Platform } from 'native-base';
import { withNavigation } from 'react-navigation';
import StyleVars from '../styles/variables';

const NavigationBar = ({ navigation, currentScreen }) => {
  const { replace } = navigation;
  return(
    <Footer style={styles.footer}>
      <FooterTab>
        <Button style={styles.button} light onPress={()=> replace('Dashboard')}>
          <Icon style={{
            color: currentScreen === "DASH" ? StyleVars.brandColor : "black",
          }} name="paper" />
          <Text>Dash</Text>
        </Button>
        <Button style={styles.button} light onPress={()=> replace('MyFridge')}>
          <Icon style={{
            color: currentScreen === "FRIDGE" ? StyleVars.brandColor : "black",
          }} name="nutrition" />
          <Text>Fridge</Text>
        </Button>
        <Button style={styles.button} light onPress={() => replace('OCRCamera')}>
          <Icon style={{
            color: currentScreen === "CAMERA" ? StyleVars.brandColor : "black",
          }} name="camera" />
          <Text>Scan</Text>
        </Button>
        <Button style={styles.button} light onPress={()=> replace('Search')}>
          <Icon style={{
            color: currentScreen === "SEARCH" ? StyleVars.brandColor : "black",
          }} name="search" />
          <Text>Search</Text>
        </Button>
        <Button style={styles.button} light onPress={()=> replace('Profile')}>
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
  footer: {
    backgroundColor: StyleVars.footerColor,
    margin: 0,
    padding: 0,
  },
  button: {
    backgroundColor: StyleVars.footerColor,
  },
});

export default withNavigation(NavigationBar);