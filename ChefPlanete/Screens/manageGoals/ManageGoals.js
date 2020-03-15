import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, SwipeableListView, Modal, Alert, Picker, ScrollView } from "react-native";
import { Chevron } from 'react-native-shapes';
import NavigationBar from '../../components/NavigationBar';
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";
import {
  Body,
  Badge,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Text,
  Header,
  Title,
  Spinner,
  List,
  Icon,
  Left,
  Right,
  ListItem,
  Segment,
  Thumbnail,
  Form,
  Item,
  Input,
  Toast,
} from 'native-base';
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import PageHeader from "../../components/PageHeader";
import { getGoals, getPantry, goalsIsLoading } from "../../reducers";
import StyleVars from "../../styles/variables";
import { bindActionCreators } from "redux";
import convert from "convert-units";
import {
  completeWeeklyGoal,
  createNewWeeklyGoal,
  deleteWeeklyGoalById,
  resetAllWeeklyGoals,
  updateWeeklyGoalById
} from "../../actions/weeklyGoalsActions";
import { updateUserPantry } from "../../actions/pantryActions";
import { getSingleRecipeById } from "../../services/spoonacular";

const ManageGoals = ({goals, navigation, onAdd, onEdit, onDelete, onComplete, onResetAll, pantry, updatePantry}) => {
  const [segment, setSegment] = useState("TODO");
  const [goalToComplete, setGoalToComplete] = useState(null);
  const [pantryUpdate, setPantryUpdate] = useState({});
  const [confirmModalActive, setConfirmModalActive] = useState(false);
  const [selectedGoalRow, setSelectedGoalRow] = useState(null);
  const swipeRows = [];

  const calculatePantryUpdate = (pantryIngredients, reviewedIngredients) => {
    return Object.fromEntries(Object.entries(reviewedIngredients)
      .filter(([key, ingredient]) => pantryIngredients[ingredient.name] !== undefined && pantryIngredients[ingredient.name] !== null).map(([key, ingredient]) => {
        let pantryIngredient = pantryIngredients[ingredient.name];
        if (pantryIngredient.unitName === ingredient.unitName) {
          return [ingredient.name, {...ingredient, quantity: Math.max(0, pantryIngredient.quantity - ingredient.quantity)}]
        }
        else {
          try {
            const conversion = convert(ingredient.quantity).from(ingredient.unitName).to(pantryIngredient.unitName);
            return [ingredient.name, {
              ...ingredient,
              unitName: pantryIngredient.unitName,
              quantity: Math.max(0, pantryIngredient.quantity - conversion),
            }]
          } catch (e) {
            return ["", {...ingredient, quantity: 0}];
          }
        }
    }));
  };

  const handleGoalCompletion = (updatedPantry, goalId) => {
    setGoalToComplete(null);
    setConfirmModalActive(false);
    onComplete(goalId).then(() => {
      updatePantry(updatedPantry).then(() => {
        Toast.show({
          text: "Success completing goal!",
          buttonText: "Okay",
          duration: 3000,
          type: "success"
        });
      });
    });
  };

  const initializePantryUpdate = (pantryIngredients, ingredients) => {
    return Object.fromEntries(Object.entries(ingredients).map(([key, ingredient]) => {
      if (pantryIngredients[key]) {
        const pantryIng = pantryIngredients[key];
        // If the units are the same then no edits need to be made
        if (pantryIng.unitName === ingredient.unitName) {
          return [key, ingredient];
        }
        // If the units are NOT the same then we need to check if the units are supported
        else if (convert().possibilities().includes(ingredient.unitName)) {
          try {
            const conversion = convert(ingredient.quantity).from(ingredient.unitName).to(pantryIng.unitName);
            return [key, {
              ...ingredient,
              unitName: pantryIng.unitName,
              quantity: conversion,
            }];
          } catch (e) {
            return [key, {...ingredient, unitName: "g", quantity: 0}];
          }
        }
        // If units are NOT supported then we set the unitName to grams and the quantity to 0
        else {
          return [key, {...ingredient, unitName: "g", quantity: 0}];
        }
        // If the ingredient cannot be found in the pantry then ask user to match ingredient
      } else {
        return [key, {name: null, unitName: "g", quantity: 0, noMatchFound: true, unMatchedName: ingredient.name}];
      }
    }));
  };

  const deleteGoal = (goalId) => {
    Alert.alert(
      "Are you sure?",
      "This action can't be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            selectedGoalRow.closeRow();
            onDelete(goalId).then(() => Toast.show({
              text: "Success deleting goal!",
              buttonText: "Okay",
              duration: 3000,
              type: "success"
            })).catch(() => Toast.show({
              text: "Error deleting goal!",
              buttonText: "Okay",
              duration: 3000,
              type: "warning"
            }));
            setSelectedGoalRow(null);
          },
        },
      ]
    );
  };

  return (
    <Container style={styles.container}>
      <PageHeader title="Goals" hasBack navigation={navigation}/>
      <Segment style={{borderWidth: 0}}>
        <Button onPress={() => setSegment("TODO")} active={segment === "TODO"} first>
          <Text>To Do</Text>
        </Button>
        <Button onPress={() => setSegment("COMPLETED")} active={segment === "COMPLETED"} last>
          <Text>Completed</Text>
        </Button>
      </Segment>
      <Content>
        <Modal
          visible={confirmModalActive}
          animationType="slide"
          transparent
        >
          <ScrollView contentContainerStyle={styles.modal}>
            <Card style={styles.card}>
              <Text adjustsFontSizeToFit style={styles.titleHeader}>Review Fridge Usage</Text>
              <View style={{flexDirection: "row", paddingVertical: 5}}>
                <Item style={{flexDirection: "row", flex: 4, borderColor: "transparent"}}>
                  <View style={{flexDirection: "column", flex: 1}}>
                    <Text style={{textAlign: "left"}} note>Name</Text>
                  </View>
                </Item>
                <Item style={{flexDirection: "row", flex: 4, borderColor: "transparent"}}>
                  <View style={{flexDirection: "column", flex: 1}}>
                    <Text note>Quantity</Text>
                  </View>
                  <View style={{flexDirection: "column", flex: 1}}>
                    <Text note>Unit</Text>
                  </View>
                </Item>
              </View>
              {
                Object.entries(pantryUpdate).sort(([keyA], [keyB]) => {
                  if (keyA > keyB) return -1;
                  if (keyB > keyA) return 1;
                  return 0;
                }).map(([key, ingredient]) => {
                  const stringQuantity = ingredient.quantity.toString();
                  const isValid = !isNaN(ingredient.quantity) && ingredient.name !== null;
                  return (
                    <View key={key} style={{flexDirection: "row", paddingVertical: 5}}>
                      <Item style={{flexDirection: "row", flex: 4}}>
                        <View style={{flexDirection: "column", flex: 1}}>
                          <RNPickerSelect
                            placeholder={ingredient.noMatchFound ? {
                              label: ingredient.unMatchedName,
                              value: ingredient.unMatchedName
                            } : {}}
                            style={pickerStyle}
                            placeholderTextColor={"#ffab29"}
                            onValueChange={(newValue) => setPantryUpdate({
                              ...pantryUpdate,
                              [key]: {
                                ...pantryUpdate[key],
                                name: newValue,
                              },
                            })}
                            items={Object.keys(pantry).map(name => {
                              return {label: name, value: name};
                            })}
                            value={ingredient.name}
                            Icon={() => <Chevron color="gray" size={1.5}/>}
                          />
                        </View>
                      </Item>
                      <Item style={{flexDirection: "row", flex: 4}}>
                        <View style={{flexDirection: "column", flex: 1}}>
                          <Input
                            style={{
                              ...styles.quantityInput,
                              color: isNaN(stringQuantity) ? "#ffab29" : StyleVars.headingColor,
                            }}
                            keyboardType="decimal-pad"
                            onChangeText={(newText) => setPantryUpdate({
                              ...pantryUpdate,
                              [key]: {
                                ...pantryUpdate[key],
                                quantity: newText,
                              },
                            })}
                            value={stringQuantity}
                          />
                        </View>
                        <View style={{flexDirection: "column", flex: 1}}>
                          <RNPickerSelect
                            style={pickerStyle}
                            onValueChange={(newValue) => setPantryUpdate({
                              ...pantryUpdate,
                              [key]: {
                                ...pantryUpdate[key],
                                unitName: newValue,
                              },
                            })}
                            items={convert().possibilities("mass").concat(convert().possibilities("volume")).map(unit => {
                              return {label: unit, value: unit}
                            })}
                            value={ingredient.unitName}
                            Icon={() => <Chevron color="gray" size={1.5}/>}
                          />
                        </View>
                      </Item>
                    </View>
                  )
                })
              }
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Button style={{justifyContent: "center", width: "45%"}} danger onPress={() => {
                  setGoalToComplete(null);
                  setConfirmModalActive(false);
                }}>
                  <Text>
                    Close
                  </Text>
                </Button>
                <Button style={{justifyContent: "center", width: "45%"}} onPress={() => {
                  handleGoalCompletion(calculatePantryUpdate(pantry, pantryUpdate), goalToComplete.goalId);
                }}>
                  <Text>
                    Accept
                  </Text>
                </Button>
              </View>
            </Card>
          </ScrollView>
        </Modal>
        {
          goals &&
          goals.filter(goal => {
            if (segment === "TODO") {
              return !goal.complete;
            } else {
              return goal.complete;
            }
          }).map((goal, index) => (
            <SwipeRow
              key={goal.goalId}
              ref={(c) => swipeRows[index] = c}
              onRowOpen={() => {
                if (selectedGoalRow && selectedGoalRow !== swipeRows[index]) {
                  selectedGoalRow.closeRow();
                }
                setSelectedGoalRow(swipeRows[index]);
              }}
              disableRightSwipe={segment !== "TODO"}
              previewDuration={1}
              leftOpenValue={75}
              rightOpenValue={-150}>
              <View style={styles.rowBack}>
                <View>
                  <TouchableOpacity onPress={() => {
                    selectedGoalRow.closeRow();
                    setGoalToComplete(goal);
                    setPantryUpdate(initializePantryUpdate(pantry, goal.recipe.ingredients));
                    setConfirmModalActive(true);
                  }} style={{...styles.rowButton, backgroundColor: StyleVars.brandColor}}>
                    <Icon style={{color: "white"}} name="md-checkmark-circle"/>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row", height: "100%"}}>
                  <TouchableOpacity onPress={() => {
                    selectedGoalRow.closeRow();
                    setSelectedGoalRow(null);
                    navigation.replace("EditGoal", {
                      editGoal: onEdit,
                      goal: goal,
                    });
                  }} style={{...styles.rowButton, backgroundColor: "#edd546"}}>
                    <Icon style={{color: "white"}} name="md-brush"/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    selectedGoalRow.closeRow();
                    setSelectedGoalRow(null);
                    deleteGoal(goal.goalId);
                  }} style={{...styles.rowButton, backgroundColor: "red"}}>
                    <Icon style={{color: "white"}} name="md-trash"/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rowFront}>
                <ListItem onPress={() => {
                  getSingleRecipeById(goal.recipe.recipeId).then(({id, title, image, diets, analyzedInstructions, summary, extendedIngredients}) => navigation.navigate("RecipeDisplay", {
                    recipeId: id,
                    recipeTitle: title,
                    recipeImage: image,
                    diets: diets,
                    instructions: analyzedInstructions,
                    summary: summary,
                    ingredients: extendedIngredients,
                  }));
                }} button avatar>
                  {
                    segment === "TODO" ?
                      <Left style={{padding: 0, margin: 0}}>
                        <Thumbnail source={{uri: goal.recipe.recipeImageUrl}}/>
                      </Left>
                      :
                      <Left style={{padding: 0, margin: 0}}>
                        <Thumbnail style={{tintColor: "gray"}} source={{uri: goal.recipe.recipeImageUrl}}/>
                        <Thumbnail style={{position: "absolute", bottom: 0, opacity: 0.3}}
                                   source={{uri: goal.recipe.recipeImageUrl}}/>
                      </Left>
                  }
                  <Body style={{height: "100%"}}>
                    <Text numberOfLines={1}>{goal.recipe.recipeName}</Text>
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
                </ListItem>
              </View>
            </SwipeRow>
          ))
        }
        <Button onPress={() => navigation.replace("EditGoal", {
          editGoal: onAdd,
          goal: null,
        })} style={{width: "100%", justifyContent: "center", shadowOpacity: 0, backgroundColor: "#eeeeee"}}>
          <Icon style={{color: StyleVars.brandColor}} active={true} name="add"/>
        </Button>
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
    padding: 10,
    backgroundColor: StyleVars.cardBackground,
    opacity: 1,
    alignSelf: "center",
    flex: 1,
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
  modal: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  quantityInput: {
    textAlign: "right",
    flex: 1,
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
  nameInput: {
    flex: 2,
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
});

const pickerStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
  iconContainer: {
    top: "50%",
    right: 5,
  },
});

const mapStateToProps = state => ({
  goalsAreLoading: goalsIsLoading(state),
  goals: getGoals(state),
  pantry: getPantry(state),
});

export const mapDispatchToProps = dispatch => bindActionCreators({
  onAdd: createNewWeeklyGoal,
  onEdit: updateWeeklyGoalById,
  onDelete: deleteWeeklyGoalById,
  onComplete: completeWeeklyGoal,
  onResetAll: resetAllWeeklyGoals,
  updatePantry: updateUserPantry,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageGoals);
