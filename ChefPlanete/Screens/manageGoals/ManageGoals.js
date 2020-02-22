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
  const [test, setTest] = useState(Array(20).fill('').map((_, i) => ({ key: `${i}`, text: `item #${i}` })));
  const deleteRow = (secId, rowId, goalId, rowMap) => {
    deleteGoalById(goalId).then(() => rowMap[`${secId}${rowId}`].closeRow());
  };
  const toFlatList = (list) => {
    return list.map((index, item) => {
      return {
        key: `${index}`,
        value: item,
      };
    });
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
          goals.map((goal, index) => (
            <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
              <View style={styles.rowBack}>
                <Text>Left</Text>
                <Text>Right</Text>
              </View>
              <View style={styles.rowFront}>
                <Text>I am a standalone SwipeRow</Text>
              </View>
            </SwipeRow>
          ))
        }
      </Content>
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
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});

const mapStateToProps = state => ({
  goalsAreLoading: goalsIsLoading(state),
  goals: getGoals(state),
});

export default connect(mapStateToProps)(ManageGoals);
