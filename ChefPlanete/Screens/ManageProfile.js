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
  const {navigate} = navigation;
  const [isErrorState, setErrorState] = useState(false);
  const [cookingLevel, setCookingLevel] = useState(dietaryProfile.cookingLevel);
  const [foodRestrictions, setFoodRestrictions] = useState(dietaryProfile.foodRestrictions);
  
  checkBoxStates = [true, false, false, false, false, false, false, false, false, false, false, false];

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

  const setCheckboxStates = () => {
    // Future check to see if a restriction is already a thing
    // foodRestrictions.forEach(() => {
    //   spoonacularIntolerances
    // })
    return [true, false, false, false, false, false, false, false, false, false, false, false];
  }

  const toggleCheckboxStates = (index) => {
    console.log("updating checkbox at ", index, "to true");
    if (checkBoxStates[index] == false) {
      checkBoxStates[index] = true;
    } else {
      checkBoxStates[index] = false;
    }
    console.log("checkBoxStates now: ", checkBoxStates);
  }

  const updateProfile = () => {
    console.log("in update profile!!");
    newFoodRestrictions = []
    checkBoxStates.forEach((checkBoxState, index) => {
      if(checkBoxState) {
        newFoodRestrictions.push(spoonacularIntolerances[index].value);
        console.log("appended a restriction!!: ", spoonacularIntolerances[index].value)
      }
    })
    console.log("updating profile completed: ", cookingLevel, newFoodRestrictions);
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
              selectedValue={cookingLevel}
              placeholderIconColor="white"
              onValueChange={(itemValue) => setCookingLevel(itemValue)}
            >
              <Picker.Item label="1 -Beginner" value="1" />
              <Picker.Item label="2 - Intermediate" value="2" />
              <Picker.Item label="3 - Advanced" value="3" />
            </Picker>
            <Text style={styles.heading}>
              I have an intolorance for the following:
            </Text>
            {
              spoonacularIntolerances.map(({id, value}) => {
                return (
                  <ListItem key={id}>
                    <CheckBox checked={checkBoxStates[id]} onPress={() => toggleCheckboxStates(id)} color={"#5DA60A"} />
                    <Body>
                      <Text>{value}</Text>
                    </Body>
                  </ListItem>
                );
              })
            }
            <Button onPress={() => updateProfile()} style={styles.button}>
              <Text adjustsFontSizeToFit>Confirm</Text>
            </Button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProfile);
