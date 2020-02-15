import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, ScrollView } from "react-native";
import { Container, Body, Card, CardItem, Icon, Content, Title, Button } from 'native-base';
import NavigationBar from '../components/NavigationBar';
import RecipeRecommender from '../components/recipeRecommender';
import { getPantry } from "../reducers";
import { connect } from "react-redux";
import * as Font from 'expo-font';
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";

const MyFridge = ({navigation, pantry}) => {

  const removeItem = () => {
    console.log("Item being removed...");
  };
  const {navigate} = navigation;
  return (
    <Container style={styles.container}>
      <PageHeader title="My Fridge" />
      <Content style={{paddingVertical: 10, paddingHorizontal: 15}}>
        {
          Object.entries(pantry).map(([key, value]) => {
            return (
              <Card style={styles.card} key={key}>
                <CardItem style={styles.card}>
                  <Body style={styles.itemView}>
                    <Text adjustsFontSizeToFit style={styles.item} key={key}>{value.name} {value.quantity} {value.unitName}</Text>
                    <Button style={styles.button} onPress={removeItem}>
                      <Icon name="close"/>
                    </Button>
                  </Body>
                </CardItem>
              </Card>
            )
          })
        }
      </Content>
      <NavigationBar currentScreen="FRIDGE"/>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleVars.background,
  },
  heading: {
    fontFamily: 'pacifico',
    color: StyleVars.headingColor,
    fontSize: 45,
    textAlign: "center",
  },
  item: {
    fontFamily: 'SF Pro Display Bold',
    flex: 5,
    fontSize: 18,
    color: "black",
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: 8,
    backgroundColor: StyleVars.cardBackground,
  },
  icon: {
    fontSize: 30,
    color: "black",
    lineHeight: 20,
    top: "90%",
    flexDirection: "row-reverse",
  },
  itemView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
});

const mapStateToProps = state => ({
  pantry: getPantry(state),
});

export default connect(mapStateToProps)(MyFridge);