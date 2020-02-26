import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Badge, Button, Container, Content } from 'native-base';
import NavigationBar from '../components/NavigationBar';
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";
import { isLoading, getErrors, getDietaryProfile } from "../reducers/dietaryProfile";
import { updateUserDietaryProfile } from "../actions/dietaryProfileActions";

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit: updateUserDietaryProfile}, dispatch);

export const mapStateToProps = state => ({
  dietaryProfile: !state.dp.data ? null : getDietaryProfile(state),
  loading: isLoading(state),
  errors: getErrors(state),
});

const Profile = ({ onSubmit, dietaryProfile, loading, errors, navigation }) => {
  const [isErrorState, setErrorState] = useState(false);
  const [isSetup, setSetup] = useState(false);
  const [cookingLevel, setCookingLevel] = useState("");
  const [foodRestrictions, setFoodRestrictions] = useState([]);
  
  useEffect(() => {
    if (!loading && dietaryProfile && !isSetup) {
      console.log("NOMORELOAD");
      setCookingLevel(dietaryProfile.cookingLevel)
      var restrictions = [];
      dietaryProfile.foodRestrictions.forEach((item) =>
        restrictions.push(item)
      );
      setFoodRestrictions(restrictions);
      setSetup(true);
    }
  });
  
  return (
    <Container style={styles.container}>
      <PageHeader title="Profile"/>
      <Content>
        {
          isSetup && !loading ?
          <View>
          <Text style={styles.text}>Test test</Text>
            <Card>
              <CardItem>
                <Text style={styles.text}>testaaa</Text>
              </CardItem>
            </Card>
          </View>: <Text>Error loading profile.</Text>
        }
        {
          isErrorState &&
          <View>
            <Text style={styles.text}>Error(s) loading the user's profile:</Text>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
        }
        {
          !loading &&
          <View>
            <Text adjustsFontSizeToFit>DONE LOADING HECK YA</Text>
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
  text: {
    color: "rgb(0,0,0)",
    fontSize: 20,
    textAlign: "center",
  }
});

export default Profile;
