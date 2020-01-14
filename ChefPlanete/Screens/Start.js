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
    justifyContent: 'center',
    color: "rgba(94,167,11,1)",
    fontSize: 56,
    flex: 1,
    textAlign: "center",
    marginTop: "60%"
  }
});