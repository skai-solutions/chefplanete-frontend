import React, { Component } from 'react';
import { Button, Footer, FooterTab, Icon, StyleProvider } from 'native-base';
import { withNavigation } from 'react-navigation';

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

export default withNavigation(NavigationBar);