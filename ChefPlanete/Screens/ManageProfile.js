import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Icon,
  CardItem,
  Body,
  Button,
  Container,
  CheckBox,
  Content,
  Header,
  Item,
  ListItem,
  Picker,
  Row,
  Title,
  Input,
  Text
} from "native-base"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NavigationBar from '../components/NavigationBar';
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";
import { dietaryProfileIsLoading, getDietaryProfileErrors, getDietaryProfile } from "../reducers";
import { updateUserDietaryProfile } from "../actions/dietaryProfileActions";

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit: updateUserDietaryProfile}, dispatch);

export const mapStateToProps = state => ({
  dietaryProfile: getDietaryProfile(state),
  loading: dietaryProfileIsLoading(state),
  errors: getDietaryProfileErrors(state),
});

const ManageProfile = ({ onSubmit, dietaryProfile, loading, errors, navigation }) => {
  const spoonacularIntolerances = [
    {
      id: 0,
      value: "Dairy"
    },
    {
      id: 1,
      value: "Egg"
    },
    {
      id: 2,
      value: "Gluten"
    },
    {
      id: 3,
      value: "Grain"
    },
    {
      id: 4,
      value: "Peanut"
    },
    {
      id: 5,
      value: "Seafood"
    },
    {
      id: 6,
      value: "Sesame"
    },
    {
      id: 7,
      value: "Shellfish"
    },
    {
      id: 8,
      value: "Soy"
    },
    {
      id: 9,
      value: "Sulfite"
    },
    {
      id: 10,
      value: "Tree Nut"
    },
    {
      id: 11,
      value: "Wheat"
    },
  ]
  const [isErrorState, setErrorState] = useState(false);
  const [cookingLevel, setCookingLevel] = useState(dietaryProfile.cookingLevel);
  const [foodRestrictions, setFoodRestrictions] = useState(dietaryProfile.foodRestrictions);
  // Set the checkBoxStates to already have the current intolerances selected
  const initCheckBoxStates = () => {
    initStates = [false, false, false, false, false, false, false, false, false, false, false, false];
    foodRestrictions.forEach((restriction) => {
      spoonacularIntolerances.forEach((intolerance) => {
        if(Object.values(intolerance)[1] === restriction){
          initStates[Object.values(intolerance)[0]] = true;
        }
      });
    })
    return initStates;
  }
  const [checkBoxStates, setCheckBoxStates] = useState(initCheckBoxStates());

  //Called when the checkbox is selected
  const toggleCheckBox = (id) => {
    updatedCheckBoxStates = [];
    checkBoxStates.map((item, index) => {
      if (index === id) {
        if (checkBoxStates[index] == false) {
          updatedCheckBoxStates[index] = true;
        } else {
          updatedCheckBoxStates[index] = false;
        }
      } else {
        updatedCheckBoxStates[index] = item;
      }
    });
    setCheckBoxStates(updatedCheckBoxStates);
  }

  const updateProfile = () => {
    newFoodRestrictions = []
    checkBoxStates.forEach((checkBoxState, index) => {
      if(checkBoxState) {
        newFoodRestrictions.push(spoonacularIntolerances[index].value);
      }
    })
    onSubmit({
      userId: dietaryProfile.userId,
      cookingLevel: cookingLevel,
      totalGoalsCompleted: dietaryProfile.totalGoalsCompleted,
      foodRestrictions: newFoodRestrictions
    }).then(() => navigation.replace('Profile'))
      .catch(() => setErrorState(true));
  };

  return (
    <Container style={styles.container}>
      <PageHeader title="Profile"/>
      <Content style={styles.profile}>
        {
          !loading ?
          <View>
            <Text style={styles.heading}>Cooking Level:</Text>
            <Picker
              iosIcon={<Icon style={{color: "black"}} name="arrow-down" />}
              mode="dropdown"
              selectedValue={cookingLevel.toString()}
              placeholderIconColor="white"
              onValueChange={(itemValue) => setCookingLevel(itemValue)}
            >
              <Picker.Item label="1 -Beginner" value="1" />
              <Picker.Item label="2 - Intermediate" value="2" />
              <Picker.Item label="3 - Advanced" value="3" />
            </Picker>
            <Text style={styles.heading}>
              Select any intolerance(s) that apply:
            </Text>
            {
              spoonacularIntolerances.map(({id, value}) => {
                return (
                  <ListItem key={id}>
                    <CheckBox checked={checkBoxStates[id]} onPress={() => toggleCheckBox(id)} color={"#5DA60A"} />
                    <Body>
                      <Text>{value}</Text>
                    </Body>
                  </ListItem>
                );
              })
            }
            <View style={styles.padding}>
              <Button onPress={() => updateProfile()} style={styles.button}>
                <Text adjustsFontSizeToFit>Confirm</Text>
              </Button>
            </View>
          </View> : <Text adjustsFontSizeToFit style={styles.heading}>Loading...</Text>
        }
        {
          isErrorState &&
          <View>
            <Text style={styles.text}>Error(s) loading the user's profile:</Text>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
        }
      </Content>
      <NavigationBar currentScreen="PROFILE"/>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: StyleVars.background,
  },
  card: {
    borderRadius: 8,
    backgroundColor: StyleVars.cardBackground,
  },
  cardItems: {
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  heading: {
    fontFamily: "SF Pro Display Heavy",
    fontSize: 20,
    color: StyleVars.headingColor,
  },
  text: {
    color: "rgb(0,0,0)",
    fontSize: 20,
    textAlign: "center",
  },
  profile: {
    padding: 20,
  },
  padding: {
    paddingBottom: "10%",
    paddingTop: "5%"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProfile);
