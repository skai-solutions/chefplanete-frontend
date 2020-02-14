import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Badge, Button, Container, Content, Footer, FooterTab, Header, Icon } from 'native-base';
import NavigationBar from '../components/NavigationBar';
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";

const Profile = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <Container style={styles.container}>
      <PageHeader title="Profile"/>
      <Content>
      </Content>
      <NavigationBar currentScreen="PROFILE"/>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleVars.background,
  },
  heading: {
    color: "rgba(94,167,11,1)",
    fontSize: 45,
    lineHeight: 0,
    textAlign: "center",
    marginLeft: "30%"
  }
});

export default Profile;
