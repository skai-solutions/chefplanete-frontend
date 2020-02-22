import React, { Component } from 'react';
import { Badge, StyleSheet, Text, View } from "react-native";
import { Body, Button, Container, Content, Footer, FooterTab, Header, Icon, Input, Item, Title } from 'native-base';
import NavigationBar from '../components/NavigationBar';
import StyleVars from '../styles/variables';
import PageHeader from "../components/PageHeader";

const Search = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <Container style={styles.container}>
      <PageHeader title="Search Recipes"/>
        <Item style={{paddingHorizontal: 5}}>
          <Icon name="search"/>
          <Input placeholder="Search"/>
          <Button transparent>
            <Icon name="md-checkmark-circle"/>
          </Button>
        </Item>
      <Content>
      </Content>
      <NavigationBar currentScreen="SEARCH"/>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleHeader: {
    fontFamily: "SF Pro Display Heavy",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 25,
  },
  container: {
    backgroundColor: StyleVars.background,
  },
  heading: {
    color: "rgba(236,243,229,1)",
    position: "absolute",
    fontSize: 45,
    lineHeight: 0,
    textAlign: "center",
  },
});

export default Search;