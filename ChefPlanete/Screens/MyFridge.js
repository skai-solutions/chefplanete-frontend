import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableHighlight, ScrollView} from "react-native";
import {Container, Body, Card, CardItem, Icon} from 'native-base';
import NavigationBar from '../components/NavigationBar';
import RecipeRecommender from '../components/recipeRecommender';
import {getPantry} from "../reducers";
import {connect} from "react-redux";
import * as Font from 'expo-font';

const MyFridge = ({navigation, pantry}) => {

  const removeItem = () => {
    console.log("Item being removed...");
  }
  const {navigate} = navigation;
  return (
    <Container style={styles.container}>
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>MyFridge</Text>
        {
          Object.entries(pantry).map(([key, value]) => {
            return (

              <View key={key} style={styles.cardPadding}>
                <Card key={key}>
                  <CardItem style={styles.card}>
                    <Body>
                      <View style={styles.itemView}>
                        <Text style={styles.item} key={key}>{value.name} {value.quantity} {value.unitName}</Text>
                        <TouchableHighlight onPress={removeItem}>
                          <Icon name="close" style={styles.icon}/>
                        </TouchableHighlight>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              </View>

            )
          })
        }
      </View>
      </ScrollView>
      <NavigationBar/>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(20,19,19,1)"
  },
  heading: {
    fontFamily: 'pacifico',
    color: "rgba(94,167,11,1)",
    fontSize: 45,
    textAlign: "center",
    marginTop: "10%",
    paddingBottom: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "white",
  },
  card: {
    backgroundColor: "grey",
    paddingRight: "10%",
  },
  cardPadding: {
    paddingLeft: "10%",
    paddingRight: "10%",

  },
  icon: {
    fontSize: 30,
    color: "white",
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