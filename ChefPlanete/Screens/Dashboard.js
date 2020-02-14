import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Title,
} from 'native-base';
import NavigationBar from '../components/NavigationBar';
import { getUser } from "../reducers";
import { connect } from "react-redux";
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";

const Dashboard = ({navigation, user}) => {
  const {navigate} = navigation;
  return (
    <Container style={styles.container}>
      <PageHeader title="Dashboard"/>
      <Content>
        <View style={styles.dashboard}>
          <Text style={styles.title}>Hello {user.name.split(" ")[0]}!</Text>
          <Card transparent style={styles.card}>
            <CardItem style={styles.card} header>
              <Text style={styles.heading}>Goals</Text>
            </CardItem>
            <CardItem style={styles.card}>
              <Body>
              </Body>
            </CardItem>
          </Card>
          <Card transparent style={styles.card}>
            <CardItem style={styles.card} header>
              <Text style={styles.heading}>Pantry</Text>
            </CardItem>
            <CardItem style={styles.card}>
              <Body>
              </Body>
            </CardItem>
          </Card>
        </View>
      </Content>
      <NavigationBar currentScreen="DASH" />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleVars.background,
  },
  titleHeader: {
    fontFamily: "SF Pro Display Heavy",
    textAlign: "center",
    alignSelf: "center",
    color: StyleVars.brandSecondaryColor,
    fontSize: 25,
    paddingBottom: "3%",
  },
  card: {
    borderRadius: 8,
    backgroundColor: StyleVars.cardBackground,
  },
  title: {
    fontFamily: "SF Pro Display Heavy",
    color: StyleVars.titleColor,
    fontSize: 35,
  },
  heading: {
    fontFamily: "SF Pro Display Heavy",
    fontSize: 20,
    color: StyleVars.headingColor,
  },
  dashboard: {
    padding: 20,
  },
  text: {
    width: 375,
    height: 50,
    color: StyleVars.brandColor,
    fontSize: 32,
    textAlign: "center",
    marginTop: 62,
    alignSelf: "center",
  },
});

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(Dashboard);