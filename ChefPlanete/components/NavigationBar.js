import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { Button, Footer, FooterTab, Icon, StyleProvider } from 'native-base';

const NavigationBar = ({ navigation }) => {
    const { navigate } = navigation;
    return(
      <Footer>
        <FooterTab>
          <Button active onPress={()=> navigate('MyFridge')}>
            <Icon name="nutrition" />
          </Button>
          <Button active>
            <Icon name="camera" />
          </Button>
          <Button active onPress={()=> navigate('Search')}>
            <Icon name="search" />
          </Button>
          <Button active onPress={()=> navigate('Profile')}>
            <Icon name="person"  />
          </Button>
        </FooterTab>
      </Footer>
    )
}

export default NavigationBar;