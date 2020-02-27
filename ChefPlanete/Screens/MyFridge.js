import React, {Component, useState} from 'react';
import { StyleSheet, View, Text, TouchableHighlight, ScrollView } from "react-native";
import {Container, Body, Card, CardItem, Icon, Content, Title, Button, Input, Item} from 'native-base';
import NavigationBar from '../components/NavigationBar';
import {cameraIsLoading, getIngredients, getIngredientsErrors, getPantry} from "../reducers";
import { updateUserPantry } from "../actions/pantryActions";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import * as Font from 'expo-font';
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit: updateUserPantry}, dispatch);

export const mapStateToProps = state => ({
  ingredients: !state.camera.data ? null : getIngredients(state),
  loading: cameraIsLoading(state),
  errors: getIngredientsErrors(state),
  pantry: !state.pantry.data ? null : getPantry(state)
});

const MyFridge = ({onSubmit,navigation, pantry}) => {

  const removeItem = (itemKey) => {
    onSubmit({
      [itemKey]: {
        name: 'TO BE REMOVED',
        unitName: 'R',
        quantity: 0,
      },
    }).catch(error => console.log(error));
  };

  const addItem = () => {
    console.log("Item being added...");
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
                    {<Text adjustsFontSizeToFit style={styles.item} key={key}>{value.name} {value.quantity} {value.unitName}</Text>}
                    <Button style={styles.button} onPress={() => removeItem(key)}>
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
}

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

export default connect(mapStateToProps,mapDispatchToProps)(MyFridge);