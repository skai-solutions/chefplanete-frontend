import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Start() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChefPlanète</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(20,19,19,1)"
  },
  text: {
    width: 353,
    height: 80,
    color: "rgba(94,167,11,1)",
    fontSize: 56,
    lineHeight: 0,
    marginTop: 325,
    marginLeft: 22
  }
});