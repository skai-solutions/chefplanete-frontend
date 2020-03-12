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
  List,
  ListItem,
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

const Profile = ({ onSubmit, dietaryProfile, loading, errors, navigation }) => {
  const {navigate} = navigation;
  const [isErrorState, setErrorState] = useState(false);
  const [cookingLevel, setCookingLevel] = useState(dietaryProfile.cookingLevel);
  const [goalsCompleted, setGoalsCompleted] = useState(dietaryProfile.totalGoalsCompleted);
  const [foodRestrictions, setFoodRestrictions] = useState(dietaryProfile.foodRestrictions);

  return (
    <Container style={styles.container}>
      <PageHeader title="Profile"/>
        <Content style={styles.profile}>
          {
            !loading ?
            <View>
              <Card transparent style={styles.card}>
                <CardItem style={styles.card} header>
                  <Content>
                    <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                      <Text style={styles.heading}>Total Goals Completed</Text>
                      <Text style={styles.heading}>{goalsCompleted}</Text>
                    </View>
                  </Content>
                </CardItem>
              </Card>
              <Card transparent style={styles.card}>
                <CardItem style={styles.card} header>
                  <Content>
                    <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                      <Text style={styles.heading}>Cooking Level</Text>
                      <Text style={styles.heading}>{cookingLevel}</Text>
                    </View>
                  </Content>
                </CardItem>
              </Card>
              <Card transparent style={styles.card}>
                <CardItem style={styles.card} header>
                  <Content>
                    <Text style={styles.heading}>Dietary Restrictions</Text>
                    <List style={{padding: 0, margin: 0}}>
                      {
                        foodRestrictions.map(restriction =>
                          <ListItem button style={styles.restrictions}>
                            <Body>
                              <Text>{restriction}</Text>
                            </Body>
                          </ListItem>
                        )
                      }
                    </List>
                  </Content>
                </CardItem>
              </Card>
              <Button onPress={() => navigate("ManageProfile")} style={{height: "90%"}}>
                <Text adjustsFontSizeToFit>Manage</Text>
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
  heading: {
    fontFamily: "SF Pro Display Heavy",
    fontSize: 20,
    color: StyleVars.headingColor,
  },
  restrictions: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0
  },
  profile: {
    padding: 20,
  },
  text: {
    color: "rgb(0,0,0)",
    fontSize: 20,
    textAlign: "center",
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
