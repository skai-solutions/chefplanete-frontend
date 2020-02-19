import React, {Component} from 'react';
import {Badge, StyleSheet, Text, View} from "react-native";
import {Button, Container, Content, Footer, FooterTab, Header, Icon, Input, Item} from 'native-base';
import NavigationBar from '../components/NavigationBar';
import React, {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getRecipesByKeywords} from "../reducers/search";
import {getSearchedRecipesErrors, searchIsLoading, getSearchedRecipes} from "../reducers";
import {searchRecipes} from "../actions/searchActions";


export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit:searchRecipes}, dispatch);
export const mapStateToProps = state => ({
  recipes: !state.search.data ? null : getSearchedRecipes(state),
  recipesLoading: searchIsLoading(state),
  errors: getSearchedRecipesErrors(state),
});

const Search = ({navigation, onSubmit, recipes, recipesLoading, errors}) => {
  const {navigate} = navigation;
  const search = (keyword) => {
    console.log("the keyword to search is: ", keyword);
    //????
    searchRecipes(keyword);

    return (
      <Container style={styles.container}>
        <View style={styles.moveDown}>
          <Header searchBar rounded style={styles.searchBar}>
            <Item>
              <Icon name="search"/>
              <Input placeholder="Search"/>
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
        </View>
        {/* <View style={styles.main}>
        <View style={styles.recommendRectangle}>
        </View>
      </View> */}

        <Content/>

        <NavigationBar/>
      </Container>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(20,19,19,1)",
    },
    heading: {
      color: "rgba(236,243,229,1)",
      position: "absolute",
      fontSize: 45,
      lineHeight: 0,
      textAlign: "center",
      marginTop: "10%"
    },
    searchBar: {
      justifyContent: "flex-start"
    },
    moveDown: {
      marginTop: "10%"
    },
    recommendRectangle: {
      width: 50,
      height: 50,
      backgroundColor: 'rgba(94,167,11,1)',
      alignItems: "stretch",
      // justifyContent: "space-around"
    },
    main: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: "space-around"
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);