import React, { Component } from "react";
import { StyleSheet, View, Text, Badge, Icon } from "react-native";

function Profile() {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.text}>About</Text>
      <Text style={styles.text1}>Skill Level</Text>
      <Text style={styles.text3}>Dietary Restrictions</Text>
      <Text style={styles.text2}>Goals</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(20,19,19,1)"
  },
  heading: {
    color: "rgba(236,243,229,1)",
    position: "absolute",
    fontSize: 45,
    lineHeight: 0,
    textAlign: "center",
    marginTop: "10%"
  },
  text: {
    color: "rgba(243,235,235,1)",
    position: "absolute",
    fontSize: 19,
    marginTop: "30%",
  },
  text1: {
    color: "rgba(243,235,235,1)",
    position: "absolute",
    fontSize: 19,
    marginTop: "65%",
  },
  text2: {
    color: "rgba(243,235,235,1)",
    position: "absolute",
    fontSize: 19,
    marginTop: "100%",
  },
  text3: {
    color: "rgba(243,235,235,1)",
    position: "absolute",
    fontSize: 19,
    marginTop: "100%",
  }

});

export default Profile;
