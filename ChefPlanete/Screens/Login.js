import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
  } from "react-native";


export default function Login() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>ChefPlanète</Text>
          <TextInput placeholder="Email*" style={styles.textInput} />
          <TextInput placeholder="Password*" style={styles.textInput2} />
          <View style={styles.rect}>
            <Text style={styles.text7}>Forgot Password ?</Text>
          </View>
          <View style={styles.buttonStack}>
            <TouchableOpacity style={styles.button} />
            <Text style={styles.text3}>Sign In</Text>
          </View>
          <Text style={styles.text4}>OR</Text>
          <View style={styles.text5Stack}>
            <Text style={styles.text5}>Don&#39;t have an account?</Text>
            <TouchableOpacity style={styles.button2} />
            <Text style={styles.text6}>Sign Up</Text>
          </View>
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
        fontFamily: "amiko-regular",
        lineHeight: 0,
        textAlign: "center",
        marginTop: 145,
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
        fontFamily: "amiko-regular",
        lineHeight: 0,
        marginTop: 27,
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
        fontFamily: "amiko-regular",
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
        fontFamily: "amiko-regular",
        lineHeight: 0
      },
      button: {
        top: 0,
        left: 0,
        width: 293,
        height: 39,
        backgroundColor: "rgba(94,167,11,1)",
        position: "absolute"
      },
      text3: {
        top: 20,
        left: 100,
        width: 108,
        height: 34,
        color: "rgba(238,243,233,1)",
        position: "absolute",
        fontSize: 20,
        fontFamily: "amiko-regular",
        lineHeight: 0
      },
      buttonStack: {
        width: 293,
        height: 54,
        marginTop: 73,
        marginLeft: 41
      },
      text4: {
        width: 65,
        height: 26,
        color: "rgba(238,243,233,1)",
        fontSize: 20,
        fontFamily: "amiko-regular",
        lineHeight: 0,
        marginTop: 49,
        marginLeft: 162
      },
      text5: {
        top: 0,
        left: 0,
        width: 202,
        height: 24,
        color: "rgba(238,243,233,1)",
        position: "absolute",
        fontSize: 16,
        fontFamily: "amiko-regular",
        lineHeight: 0
      },
      button2: {
        top: 0,
        left: 202,
        width: 71,
        height: 24,
        position: "absolute"
      },
      text6: {
        top: 0,
        left: 194,
        width: 87,
        height: 12,
        color: "rgba(94,167,11,1)",
        position: "absolute",
        fontSize: 16,
        fontFamily: "amiko-regular",
        lineHeight: 0
      },
      text5Stack: {
        width: 281,
        height: 24,
        marginTop: 30,
        marginLeft: 61
      }
});