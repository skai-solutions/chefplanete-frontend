import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
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
  Left,
  Right,
  ListItem,
  Thumbnail,
} from 'native-base';
import NavigationBar from '../components/NavigationBar';
import { getGoals, getPantry, getUser, goalsIsLoading, pantryIsLoading } from "../reducers";
import { connect } from "react-redux";
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";

const Dashboard = ({navigation, user, pantry, goals, goalsAreLoading}) => {
  const getGoalProgress = () => {
    let completedGoals = 0;
    for(let i = 0; i < goals.length; i++) {
      if (goals[i].complete) {
        completedGoals++;
      }
    }
    return (completedGoals/goals.length) * 100.0 ;
  };
  return (
    <Container style={styles.container}>
      <PageHeader title="Dashboard"/>
      <Content style={styles.dashboard}>
        <Text style={styles.title}>Hello {user.name.split(" ")[0]}!</Text>
        <Card transparent style={styles.card}>
          <CardItem style={styles.card} header>
            <Content>
              <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                <Text style={styles.heading}>Goals</Text>
                <Button onPress={() => navigation.replace("ManageGoals")} style={{height: "100%", shadowOpacity: 0}}>
                  <Text adjustsFontSizeToFit>Manage</Text>
                </Button>
              </View>
              <List style={{padding: 0, margin: 0}}>
                {
                  !goalsAreLoading ?
                    goals.filter(goal => !goal.complete).slice(0, 3).map(goal =>
                      <ListItem button style={styles.goalItems} key={goal.goalId} avatar>
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
                      </ListItem>
                    ) : <Spinner color="green"/>
                }
              </List>
            </Content>
          </CardItem>
        </Card>
        {/*<Card transparent style={styles.card}>*/}
        {/*  <CardItem style={styles.card} header>*/}
        {/*    <Text style={styles.heading}>Pantry</Text>*/}
        {/*  </CardItem>*/}
        {/*  <CardItem style={styles.card}>*/}
        {/*    <Body>*/}
        {/*    </Body>*/}
        {/*  </CardItem>*/}
        {/*</Card>*/}
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
  dashboard: {
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
});

const mapStateToProps = state => ({
  user: getUser(state),
  pantry: getPantry(state),
  goalsAreLoading: goalsIsLoading(state),
  goals: getGoals(state),
});

export default connect(mapStateToProps)(Dashboard);