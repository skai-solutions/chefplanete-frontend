import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Icon,
  CardItem,
  Body,
  Button,
  Container,
  Content,
  Header,
  Item,
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

  const spoonacularIntolerances = [
    {
      id: 1,
      value: "Dairy"
    },
    {
      id: 2,
      value: "Egg"
    },
    {
      id: 3,
      value: "Gluten"
    },
    {
      id: 4,
      value: "Grain"
    },
    {
      id: 5,
      value: "Peanut"
    },
    {
      id: 6,
      value: "Seafood"
    },
    {
      id: 7,
      value: "Sesame"
    },
    {
      id: 8,
      value: "Shellfish"
    },
    {
      id: 9,
      value: "Soy"
    },
    {
      id: 10,
      value: "Sulfite"
    },
    {
      id: 11,
      value: "Tree Nut"
    },
    {
      id: 12,
      value: "Wheat"
    },
  ]

  const updateCookingLevel = (cookingLevel) => {
    // if (cookingLevel && cookingLevel !== "") {
    //   cookingLevel = parseFloat(cookingLevel);
    // } else {
    //   cookingLevel = 0;
    // }
    console.log("updating cooking level: ", cookingLevel);
    setCookingLevel(cookingLevel);
  };

  const updateFoodRestrictions = (foodRestrictions) => {
    // if (goalsCompleted && goalsCompleted !== "") {
    //   goalsCompleted = parseFloat(goalsCompleted);
    // } else {
    //   goalsCompleted = 0;
    // }
    console.log("updating food restrictions completed: ", foodRestrictions);
    setFoodRestrictions(foodRestrictions);
    navigate("Profile");
  };

  return (
    <Container style={styles.container}>
      <PageHeader title="Profile"/>
      <Content style={styles.profile}>
        {
          !loading ?
          <View>
            <Picker
              iosIcon={<Icon style={{color: "black"}} name="arrow-down" />}
              mode="dropdown"
              selectedValue={cookingLevel}
              placeholderIconColor="white"
              onValueChange={(itemValue) => updateCookingLevel(itemValue)}
            >
            <Picker.Item label="1 -Beginner" value="1" />
              <Picker.Item label="2 - Intermediate" value="2" />
              <Picker.Item label="3 - Advanced" value="3" />
            </Picker>
            <Text>
              I have an intolorance for the following:
            </Text>
            {
              Object.entries(spoonacularIntolerances).map(([key, value]) => {
                return (
                  <ListItem key={key}>
                    <CheckBox checked={false} />
                    <Body>
                      <Text>{value}</Text>
                    </Body>
                  </ListItem>
                );
              })
            }
            {
              Object.entries(foodRestrictions).sort(([keyA], [keyB]) => {
                if (keyA > keyB) return -1;
                if (keyB > keyA) return 1;
                return 0;
              }).map(([key, value]) => {
                return (
                  <Card style={styles.card} key={key}>
                    <CardItem style={styles.card}>
                      <Body style={styles.cardItems}>
                        <Item style={{flex: 4}} underline>
                          <Input
                            onChangeText={(newText) => updateCookingLevel(newText)}
                            value={foodRestrictions}
                          />
                        </Item>
                      </Body>
                    </CardItem>
                  </Card>
                );
              })
            }
            <Button onPress={() => updateFoodRestrictions()} style={{height: "90%"}}>
                  <Text adjustsFontSizeToFit>Confirm</Text>
            </Button>
          </View> : <Text adjustsFontSizeToFit style={styles.heading}>Unable to find profile data associated with this user.</Text>
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
