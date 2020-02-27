import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, SwipeableListView } from "react-native";
import NavigationBar from '../../components/NavigationBar';
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
} from 'native-base';
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import PageHeader from "../../components/PageHeader";
import { getGoals, goalsIsLoading } from "../../reducers";
import StyleVars from "../../styles/variables";
import { deleteGoalById } from "../../services/weeklyGoals";

const ManageGoals = ({goals, navigation}) => {
  const [segment, setSegment] = useState("TODO");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const swipeRows = [];
  const [test, setTest] = useState(Array(20).fill('').map((_, i) => ({key: `${i}`, text: `item #${i}`})));
  const deleteRow = (secId, rowId, goalId, rowMap) => {
    deleteGoalById(goalId).then(() => rowMap[`${secId}${rowId}`].closeRow());
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
                if (selectedGoal && selectedGoal !== swipeRows[index]) {
                  selectedGoal.closeRow();
                }
                setSelectedGoal(swipeRows[index]);
              }}
              previewDuration={1}
              leftOpenValue={75}
              rightOpenValue={-150}>
              <View style={styles.rowBack}>
                <View>
                  <TouchableOpacity style={{...styles.rowButton, backgroundColor: StyleVars.brandColor}}>
                    <Icon style={{color: "white"}} name="md-checkmark-circle"/>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row", height: "100%"}}>
                  <TouchableOpacity style={{...styles.rowButton, backgroundColor: "#edd546"}}>
                    <Icon style={{color: "white"}} name="md-brush"/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{...styles.rowButton, backgroundColor: "red"}}>
                    <Icon style={{color: "white"}} name="md-trash"/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rowFront}>
                <ListItem button avatar>
                  <Left>
                    <Thumbnail source={{uri: goal.recipe.recipeImageUrl}}/>
                  </Left>
                  <Body style={{height: "100%"}}>
                    <Text>{goal.recipe.recipeName}</Text>
                    <View style={{paddingTop: 10, flexDirection: "row"}}>
                      {
                        Object.entries(goal.recipe.ingredients).slice(0, 3).map(([key, value]) => (
                          <Badge key={key} primary>
                            <Text>{value.name}</Text>
                          </Badge>
                        ))
                      }
                    </View>
                  </Body>
                  <Right>
                    <Text note>{goal.goalType}</Text>
                    <Text note>{`${goal.recipe.recipeCookTime} min`}</Text>
                  </Right>
                </ListItem>
              </View>
            </SwipeRow>
          ))
        }
      </Content>
      <NavigationBar/>
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
    justifyContent:"center",
    alignItems: "center",
    width: 75
  },
});

const mapStateToProps = state => ({
  goalsAreLoading: goalsIsLoading(state),
  goals: getGoals(state),
});

export default connect(mapStateToProps)(ManageGoals);
