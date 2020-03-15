import React, { useState, useEffect } from 'react';
import { StyleSheet, Keyboard, View, TouchableOpacity, SwipeableListView, Modal, Alert } from "react-native";
import PageHeader from "../../components/PageHeader";
import StyleVars from "../../styles/variables";
import {
  Container,
  Content,
  Text,
  Title,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Badge,
  Tab,
  Tabs,
  Spinner,
  Icon,
  Input,
  Button,
  Item
} from "native-base";
import { getRecipeImageUrl } from "../../services";
import { getDietaryProfile, getPantry } from "../../reducers";
import { connect } from "react-redux";
import {
  getRecipesByIngredientUsageAndRestrictions,
  searchRecipesByTextIngredientsAndRestrictions
} from "../../services/spoonacular";
import NavigationBar from "../../components/NavigationBar";

const EditGoal = ({navigation, pantry, dietaryProfile}) => {
  const isAdding = navigation.state.params.goal === null;
  const [goal, setGoal] = useState(navigation.state.params.goal);
  const [hasChanged, setChanged] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const editGoal = navigation.state.params.editGoal;

  const searchRecipes = (query) => {
    Keyboard.dismiss();
    setSearchLoading(true);
    searchRecipesByTextIngredientsAndRestrictions(
      query,
      [],
      dietaryProfile.foodRestrictions,
    ).then(response => {
      setSearchResults(response.results);
    }).finally(() => setSearchLoading(false));
  };

  const normalizeDishType = (dish) => {
    return dish.replace(" ", "_").toUpperCase();
  };

  const getRecommendations = () => {
    setRecommendationsLoading(true);
    const pantryItems = Object.entries(pantry).map(([, value]) => value.name.toLowerCase());
    getRecipesByIngredientUsageAndRestrictions(
      pantryItems,
      dietaryProfile.foodRestrictions,
    ).then(response => {
      setRecommendations(response.results);
    }).finally(() => setRecommendationsLoading(false));
  };

  useEffect(getRecommendations, []);

  return (
    <Container style={styles.container}>
      <PageHeader title={isAdding ? "Add Goal" : "Edit Goal"} hasBack backPage="ManageGoals" navigation={navigation}/>
      <Content style={{padding: 10}}>
        {
          goal ?
          <View style={{flexDirection: "row"}}>
            <Left>
              <Title style={{...styles.titleHeader, flex: 1, alignSelf: "flex-start"}}>Current Recipe</Title>
            </Left>
            <Right>
              <Button
                disabled={!hasChanged}
                onPress={() => {
                  editGoal(goal).then(() => navigation.replace("ManageGoals"));
                }}
                style={{alignSelf: "flex-end", backgroundColor: hasChanged ? StyleVars.brandColor : "#b5b5b5", borderRadius: 0, shadowOpacity: 0}}>
                <Text>Save</Text>
              </Button>
            </Right>
          </View> : null
        }
        {
          goal ?
          <ListItem style={{flex: 1}} avatar>
            <Left>
              <Thumbnail source={{uri: goal.recipe.recipeImageUrl}}/>
            </Left>
            <Body>
              <Text>{goal.recipe.recipeName}</Text>
              <View style={{paddingTop: 10, flexDirection: "row"}}>
                {
                  Object.entries(goal.recipe.ingredients).slice(0, 2).map(([key, value]) => (
                    <Badge key={key} primary>
                      <Text>{value.name}</Text>
                    </Badge>
                  ))
                }
              </View>
            </Body>
            <Right>
              <Text note>{goal.goalType.replace("_", " ")}</Text>
              <Text note>{`${goal.recipe.recipeCookTime} min`}</Text>
            </Right>
          </ListItem> : null
        }
        <Tabs>
          <Tab style={{backgroundColor: StyleVars.background, paddingBottom: 20}} textStyle={{color: "rgba(0,0,0,1)"}}
               activeTextStyle={{color: "white"}} heading="Recommend">
            <Text style={{...styles.titleHeader, alignSelf: "flex-start"}}>Recommended</Text>
            <List>
              {
                recommendationsLoading ? <Spinner color="green"/> :
                  recommendations.map(result =>
                    <ListItem button onPress={() => {
                      const {id, title, image, diets, analyzedInstructions, summary, missedIngredients, usedIngredients} = result;
                      navigation.navigate("RecipeDisplay", {
                        recipeId: id,
                        recipeTitle: title,
                        recipeImage: image,
                        diets: diets,
                        instructions: analyzedInstructions,
                        summary: summary,
                        ingredients: missedIngredients.concat(usedIngredients),
                      });
                    }} style={styles.goalItems} key={result.id} avatar>
                      <Left>
                        <Thumbnail source={{uri: result.image}}/>
                      </Left>
                      <Body style={{height: "100%"}}>
                        <Text>{result.title}</Text>
                        <Button onPress={() => {
                          setChanged(true);
                          setGoal({
                            goalId: isAdding ? null : goal.goalId,
                            goalType: normalizeDishType(result.dishTypes[0] ? result.dishTypes[0] : "NO TYPE"),
                            recipe: {
                              recipeId: result.id,
                              recipeName: result.title,
                              recipeImageUrl: result.image,
                              recipeCookTime: result.readyInMinutes,
                              ingredients: Object.fromEntries(result.usedIngredients.concat(result.missedIngredients).map(ingredient => [ingredient.name, {
                                name: ingredient.name,
                                unitName: ingredient.unitShort,
                                quantity: ingredient.amount,
                              }])),
                            },
                          })
                        }} style={{width: "65%"}}>
                          <Text adjustsFontSizeToFit>Select New Recipe</Text>
                        </Button>
                      </Body>
                      <Right>
                        <Text note>{result.dishTypes[0] ? result.dishTypes[0].toUpperCase() : "NO TYPE"}</Text>
                        <Text note>{`${result.readyInMinutes} min`}</Text>
                        <Text note>{`${result.missedIngredientCount} ingr. missing`}</Text>
                      </Right>
                    </ListItem>
                  )
              }
            </List>
          </Tab>
          <Tab style={{backgroundColor: StyleVars.background}} textStyle={{color: "rgba(0,0,0,1)"}}
               activeTextStyle={{color: "white"}} heading="Search">
            <Item style={{paddingHorizontal: 5}}>
              <Icon name="search"/>
              <Input onChangeText={text => setSearchQuery(text)} placeholder="Search"/>
              <Button onPress={() => searchRecipes(searchQuery)} transparent>
                <Icon name="md-checkmark-circle"/>
              </Button>
            </Item>
            <List>
              {
                searchLoading ? <Spinner color="green"/> :
                  searchResults.map(result =>
                    <ListItem button onPress={() => {
                      const {id, title, image, diets, analyzedInstructions, summary, missedIngredients} = result;
                      navigation.navigate("RecipeDisplay", {
                        recipeId: id,
                        recipeTitle: title,
                        recipeImage: image,
                        diets: diets,
                        instructions: analyzedInstructions,
                        summary: summary,
                        ingredients: missedIngredients,
                      });
                    }} key={result.id} style={styles.goalItems} avatar>
                      <Left>
                        <Thumbnail source={{uri: result.image}}/>
                      </Left>
                      <Body style={{height: "100%"}}>
                        <Text>{result.title}</Text>
                        <Button onPress={() => {
                          setChanged(true);
                          setGoal({
                            goalId: isAdding ? null : goal.goalId,
                            goalType: normalizeDishType(result.dishTypes[0] ? result.dishTypes[0] : "NO TYPE"),
                            recipe: {
                              recipeId: result.id,
                              recipeName: result.title,
                              recipeImageUrl: result.image,
                              recipeCookTime: result.readyInMinutes,
                              ingredients: Object.fromEntries(result.usedIngredients.concat(result.missedIngredients).map(ingredient => [ingredient.name, {
                                name: ingredient.name,
                                unitName: ingredient.unitShort,
                                quantity: ingredient.amount,
                              }])),
                            },
                          })
                        }} style={{width: "65%"}}>
                          <Text adjustsFontSizeToFit>Select New Recipe</Text>
                        </Button>
                      </Body>
                      <Right>
                        <Text note>{result.dishTypes[0] ? result.dishTypes[0].toUpperCase() : "NO TYPE"}</Text>
                        <Text note>{`${result.readyInMinutes} min`}</Text>
                        <Text note>{`${result.missedIngredientCount} ingr. missing`}</Text>
                      </Right>
                    </ListItem>
                  )
              }
            </List>
          </Tab>
        </Tabs>
      </Content>
      <NavigationBar currentScreen="DASH"/>
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
  goalItems: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0
  },
  content: {
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
  rowFront: {
    backgroundColor: StyleVars.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 88,
  },
  rowBack: {
    backgroundColor: StyleVars.background,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 88,
  },
  rowButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 75
  },
});

const mapStateToProps = state => ({
  pantry: getPantry(state),
  dietaryProfile: getDietaryProfile(state),
});

export default connect(mapStateToProps)(EditGoal);
