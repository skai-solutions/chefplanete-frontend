import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ChefPlanète</Text>

      <TextInput placeholder="Email*" style={styles.textInput} />
      <TextInput placeholder="Password*" style={styles.textInput2} />

      <View style={styles.rect}>
        <Text style={styles.link}>Forgot Password ?</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.text8Stack}>
        <Text style={styles.link1}>Don't have an account ?</Text>
        <TouchableOpacity style={styles.button3} />
        <Text style={styles.link2}>Sign Up</Text>
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
  heading: {
    width: '80%',
    height: 80,
    color: "rgba(238,243,233,1)",
    fontSize: 48,
    lineHeight: 0,
    textAlign: "center",
    marginTop: 122,
    alignSelf: "center"
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
    lineHeight: 0,
    marginLeft: 41,

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
  link: {
    width: 154,
    height: 20,
    color: "rgba(94,167,11,1)",
    fontSize: 16,
    lineHeight: 0
  },
  button: {
    width: 293,
    height: 46,
    backgroundColor: "rgba(94,167,11,1)",
    marginTop: 28,
    marginLeft: 41
  },
  buttonText: {
    width: 101,
    height: 23,
    color: "rgba(233,234,231,1)",
    fontSize: 16,
    lineHeight: 0,
    textAlign: "center",
    marginTop: 15,
    marginLeft: 96
  },
  link1: {
    top: 25,
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
    left: 219,
    width: 91,
    height: 42,
    position: "absolute"
  },
  link2: {
    top: 21,
    left: 230,
    width: 71,
    height: 24,
    color: "rgba(94,167,11,1)",
    position: "absolute",
    fontSize: 16,
    lineHeight: 0
  },
  text8Stack: {
    width: 310,
    height: 59,
    marginTop: 8,
    marginLeft: 32
  },
  button2: {
    width: 71,
    height: 24,
    marginTop: 91,
    marginLeft: 263
  }
});
export default Login;