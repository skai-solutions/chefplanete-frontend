import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

function Untitled1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChefPlanete</Text>
      <TextInput placeholder="Email*" style={styles.textInput} />
      <TextInput placeholder="Password*" style={styles.textInput2} />
      <View style={styles.rect}>
        <Text style={styles.text7}>Forgot Password ?</Text>
      </View>
      <View style={styles.buttonStack}>
        <TouchableOpacity style={styles.button} />
        <Text style={styles.text3}>Sign In</Text>
      </View>
      <View style={styles.text8Stack}>
        <Text style={styles.text8}>Don&#39;t have an account ?</Text>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.text9}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button2} />
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
    color: "rgba(238,243,233,1)",
    fontSize: 48,
    lineHeight: 0,
    textAlign: "center",
    marginTop: 108,
    marginLeft: 22
  },
  textInput: {
    width: 293,
    height: 41,
    backgroundColor: "rgba(57,55,55,1)",
    color: "rgba(94,167,11,1)",
    opacity: 1,
    borderRadius: 4,
    borderColor: "rgba(248,240,240,1)",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 16,
    lineHeight: 0,
    marginTop: 64,
    marginLeft: 41
  },
  textInput2: {
    width: 293,
    height: 41,
    backgroundColor: "rgba(57,55,55,1)",
    color: "rgba(94,167,11,1)",
    opacity: 1,
    borderRadius: 4,
    borderColor: "rgba(248,240,240,1)",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 16,
    lineHeight: 0,
    marginTop: 32,
    marginLeft: 41
  },
  rect: {
    width: 154,
    height: 20,
    marginTop: 20,
    marginLeft: 187
  },
  text7: {
    width: 154,
    height: 20,
    color: "rgba(94,167,11,1)",
    fontSize: 16,
    lineHeight: 0
  },
  button: {
    top: 0,
    left: 0,
    width: 293,
    height: 54,
    backgroundColor: "rgba(94,167,11,1)",
    position: "absolute"
  },
  text3: {
    width: 108,
    height: 34,
    color: "rgba(238,243,233,1)",
    fontSize: 20,
    lineHeight: 0,
    marginTop: 10,
    marginLeft: 120
  },
  buttonStack: {
    width: 293,
    height: 61,
    marginTop: 28,
    marginLeft: 41
  },
  text8: {
    top: 17,
    left: 0,
    width: 223,
    height: 34,
    color: "rgba(231,235,227,1)",
    position: "absolute",
    justifyContent: "space-between",
    fontSize: 16,
    lineHeight: 0,
    textAlign: "center"
  },
  button3: {
    top: 0,
    left: 223,
    width: 79,
    height: 34,
    position: "absolute"
  },
  text9: {

    width: 91,
    height: 22,
    color: "rgba(94,167,11,1)",
    fontSize: 16,
    lineHeight: 0
  },
  text8Stack: {
    width: 302,
    height: 51,
    marginTop: 1,
    marginLeft: 32
  },
  button2: {
    width: 71,
    height: 24,
    marginTop: 91,
    marginLeft: 263
  }
});

export default Untitled1;
