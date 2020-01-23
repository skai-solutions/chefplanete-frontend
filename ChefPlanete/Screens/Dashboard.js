import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Button,
  CheckBox,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  List,
  ListItem,
  StyleProvider
} from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import NavigationBar from '../components/NavigationBar';
import { getUser } from "../reducers";
import { connect } from "react-redux";

const Dashboard = ({navigation, user}) => {
  const {navigate} = navigation;
  return (
    <StyleProvider style={getTheme(material)}>
      <Container style={styles.container}>
        <Content>
          <View>
            <Text style={styles.text}>Good Morning, {user.name}!</Text>
            <Text style={styles.text2}>Today</Text>
            <View style={styles.text5Row}>
              <Text style={styles.text5}>Breakfast</Text>
              <Text style={styles.text6}>Lunch</Text>
              <Text style={styles.text7}>Dinner</Text>
            </View>
            <Text style={styles.text2}>My Fridge</Text>
            <View>
              <Text style={styles.text3}>Goals</Text>
              <List>
                <ListItem>
                  <CheckBox checked={false}/>
                  <Text style={{color: "white"}}>Goal #1</Text>
                </ListItem>
                <ListItem>
                  <CheckBox checked={false}/>
                  <Text style={{color: "white"}}>Goal #2</Text>
                </ListItem>
              </List>
            </View>
          </View>
        </Content>
        <NavigationBar/>
      </Container>
    </StyleProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(20,19,19,1)",
  },
  text: {
    width: 375,
    height: 50,
    color: "rgba(94,167,11,1)",
    fontSize: 32,
    textAlign: "center",
    marginTop: 62,
    alignSelf: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginBottom: "25%",
    marginLeft: "10%"
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    // marginBottom: "10%",
    marginLeft: "10%"
  },
  text5: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
  },
  text6: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    marginLeft: 50
  },
  text7: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    marginLeft: 59
  },
  text5Row: {
    height: 14,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: "20%",
    marginBottom: 40
  }

});

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(Dashboard);