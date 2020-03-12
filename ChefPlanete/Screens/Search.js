import React, {Component, useState} from 'react';
import { StyleSheet, View } from "react-native";
import { List, ListItem, Body, Left, Right, Thumbnail, Spinner, Button, Container, Content, Text, Footer, FooterTab, Header, Icon, Input, Item, Title } from 'native-base';
import NavigationBar from '../components/NavigationBar';
import StyleVars from '../styles/variables';
import PageHeader from "../components/PageHeader";
import { searchRecipes } from "../actions/searchActions";
import { getSearchedRecipes, searchIsLoading, getSearchedRecipesErrors} from "../reducers";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";

export const  mapDispatchToProps = dispatch => bindActionCreators( {onSubmit: searchRecipes}, dispatch);
export const mapStateToProps = state => ({
  recipes: !state.search.data ? null : getSearchedRecipes(state),
  recipesAreLoading: searchIsLoading(state),
  errors: getSearchedRecipesErrors(state),
});

const Search = ({navigation, onSubmit, recipes, recipesAreLoading, errors}) => {
  const {navigate} = navigation;
  const [query, setQuery] = useState("");
  return (
    <Container style={styles.container}>
      <PageHeader title="Search Recipes"/>
        <Item style={{paddingHorizontal: 5}}>
          <Icon name="search"/>
          <Input value={query} onChangeText={setQuery} placeholder="Search"/>
          <Button onPress={() => onSubmit(query)} transparent>
            <Icon name="md-checkmark-circle"/>
          </Button>
        </Item>
      <Content>
        {
          recipesAreLoading &&
           <Spinner color="green" />
        }
        {
          errors &&
            <View>
              <Text style={styles.text}>There was an error loading recipes!</Text>
            </View>
        }
        {
          (recipes && !recipesAreLoading) &&
          <List>
           {
             recipes.results.map(({id, title, image, readyInMinutes, diets, analyzedInstructions, summary, missedIngredients}) =>
               <ListItem avatar key={{id}}>
                 <Left>
                   <Thumbnail source={{uri:image}}/>
                 </Left>
                 <Body style={{height: "100%"}}>
                   <Text
                         onPress={() => navigate("RecipeDisplay", {
                           recipeId: id,
                           recipeTitle: title,
                           recipeImage: image,
                           diets: diets,
                           instructions: analyzedInstructions,
                           summary: summary,
                           ingredients: missedIngredients,
                         })}>{title}</Text>
                 </Body>
                <Right>
                  <Text>{readyInMinutes} minutes</Text>
                </Right>
               </ListItem>)
           }
          </List>

        }
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
  text: {
    fontFamily: "SF Pro Display Heavy",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 25,
  },
  recipe: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);