import React, { Component }  from 'react';
import { StyleSheet, View, Text, Badge } from "react-native";
import { Button, Container, Footer, FooterTab, Header, Icon } from 'native-base';

const CameraLoading = ({ navigation }) => {
  const {navigate} = navigation;
  return (
    <Container style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>Processing Photo...</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(20,19,19,1)"
    },
    heading: {
        color: 'white',
        position: "absolute",
        fontSize: 30,
        lineHeight: 0,
        textAlign: "left",
        marginTop: "70%",
        marginLeft: "10%"
    },
});

export default CameraLoading;

