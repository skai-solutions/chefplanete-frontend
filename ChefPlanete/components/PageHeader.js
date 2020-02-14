import React from "react";
import { Body, Title, Header } from "native-base";
import { StyleSheet } from "react-native";

const PageHeader = ({title}) => (
  <Header>
    <Body>
      <Title style={styles.titleHeader}>{title}</Title>
    </Body>
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