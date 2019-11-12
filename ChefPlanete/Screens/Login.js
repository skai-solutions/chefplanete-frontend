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

      <TouchableOpacity style={styles.rect}>
        <Text style={styles.link}>Forgot Password ?</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.rect1}>
        <Text style={styles.text}>Don't have an account ?</Text>
        <TouchableOpacity style={styles.rect2}>
        <Text style={styles.link2}>Sign Up</Text>
      </TouchableOpacity>
      </View>

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
    height: "10%",
    color: "rgba(238,243,233,1)",
    fontSize: 48,
    lineHeight: 0,
    textAlign: "center",
    marginTop: "25%",
    alignSelf: "center"
  },

  textInput: {
    width: "80%",
    height: "7%",
    backgroundColor: "rgba(57,55,55,1)",
    color: "rgba(94,167,11,1)",
    opacity: 1,
    borderRadius: 4,
    borderColor: "rgba(248,240,240,1)",
    borderWidth: 1,
    borderStyle: "solid",
    marginLeft: "10%"

  },
  textInput2: {
    width: "80%",
    height: "7%",
    backgroundColor: "rgba(57,55,55,1)",
    color: "rgba(94,167,11,1)",
    opacity: 1,
    borderRadius: 4,
    borderColor: "rgba(248,240,240,1)",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 16,
    lineHeight: 0,
    marginTop: "10%",
    marginLeft: "10%"
  },
  rect: {
    width: "100%",
    height: "7%",
    marginTop: "5%",
    marginLeft: "55%"
  },
  link: {
    width: "100%",
    height: 20,
    color: "rgba(94,167,11,1)",
    fontSize: 16,
    lineHeight: 0
  },
  button: {
    width: "80%",
    height: "8%",
    backgroundColor: "rgba(94,167,11,1)",
    marginTop: "10%",
    marginLeft: "10%",
    borderRadius: 4
  },
  buttonText: {
    width: "30%",
    height: "50%",
    color: "rgba(233,234,231,1)",
    fontSize: 16,
    lineHeight: 0,
    textAlign: "center",
    marginTop: "5%",
    marginLeft: "25%"
  },
  rect1: {
    width: "100%",
    height: 20,
    marginTop: "5%",
    marginLeft: "10%"
  },
  text: {
    width: "60%",
    height: 34,
    color: "rgba(231,235,227,1)",
    position: "absolute",
    justifyContent: "space-between",
    fontSize: 16,
    lineHeight: 0,
    textAlign: "center"
  },
  rect2: {
    width: "100%",
    height: "7%",
    marginTop: "0%",
    marginLeft: "55%"
  },
  link2: {
    width: "100%",
    height: 20,
    color: "rgba(94,167,11,1)",
    fontSize: 16,
    lineHeight: 0
  }
});

export default Login;