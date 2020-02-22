import React from "react";
import { Body, Title, Header, Left, Right, Button, Text, Icon } from "native-base";
import { StyleSheet } from "react-native";

const PageHeader = ({title, hasBack = false, navigation}) => (
  <Header style={{justifyContent: "center", borderBottomWidth: 0}}>
    {
      hasBack && navigation ?
        <Left style={{flex: 1}}>
          <Button hasText onPress={() => navigation.goBack()} transparent>
            <Text style={{color: "white"}}>Back</Text>
          </Button>
        </Left> : null
    }
    <Body>
      <Title style={styles.titleHeader}>{title}</Title>
    </Body>
    {
      hasBack && navigation ?
        <Right style={{flex: 1}}>
          <Button hasText onPress={() => navigation.replace("Dashboard")} transparent>
            <Text style={{color: "white"}}>Cancel</Text>
          </Button>
        </Right> : null
    }
  </Header>
);

const styles = StyleSheet.create({
  titleHeader: {
    fontFamily: "SF Pro Display Heavy",
    textAlign: "center",
    alignSelf: "center",
    color: "rgb(0,57,7)",
    fontSize: 25,
    paddingBottom: "3%",
  },
});

export default PageHeader;