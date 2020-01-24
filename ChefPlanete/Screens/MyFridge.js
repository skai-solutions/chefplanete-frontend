import React, { Component }  from 'react';
import { StyleSheet, View, Text, Badge } from "react-native";
import { Button, Container, Content, Footer, FooterTab, Header, Icon } from 'native-base';
import NavigationBar from '../components/NavigationBar';
import RecipeRecommender from '../components/recipeRecommender';
import {getPantry} from "../reducers";
import {connect} from "react-redux";

const MyFridge = ({navigation, pantry}) => {

    const {navigate} = navigation;
    return (
      <Container style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.heading}>MyFridge</Text>
            {
                Object.entries(pantry).map(([key,value])=> <Text style={styles.text} key={key}>{value.name} {value.quantity} {value.unitName}</Text>)
            }
        </View>

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
      color: "rgba(94,167,11,1)",
      fontSize: 45,
      textAlign: "center",
      marginTop: "10%",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: "rgba(236,243,229,1)",
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
  });

const mapStateToProps = state => ({
    pantry: getPantry(state),
});

export default connect(mapStateToProps)(MyFridge);
