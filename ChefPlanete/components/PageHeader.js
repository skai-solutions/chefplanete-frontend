import React from "react";
import { Body, Title, Header, Left, Right, Button, Text, Icon } from "native-base";
import { StyleSheet, Platform } from "react-native";

const PageHeader = ({title, hasBack = false, backPage = "Dashboard", navigation}) => (
  <Header style={Platform.OS !== "ios" ? styles.androidContainer : styles.container}>
    {
      hasBack && navigation ?
        <Left style={{flex: 1}}>
          <Button hasText onPress={() => navigation.replace(backPage)} transparent>
            <Text style={{color: "white"}}>Back</Text>
          </Button>
        </Left> : <Left style={{flex: 1}}/>
    }
    <Body style={{flex: 4}}>
      <Title style={styles.titleHeader}>{title}</Title>
    </Body>
    <Right style={{flex: 1}}/>
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
    paddingTop: Platform.OS !== "ios" ? 30 : 0,
  },
  container: {
    justifyContent: "center",
    borderBottomWidth: 0,
    shadowOpacity: 0,
  },
  androidContainer: {
    justifyContent: "center",
    borderBottomWidth: 0,
    shadowOpacity: 0,
    height: 80,
  },
});

export default PageHeader;