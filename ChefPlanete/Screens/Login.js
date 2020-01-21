import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import * as Google from 'expo-google-app-auth';
import { bindActionCreators } from "redux";
import { signInUser } from "../actions/userActions";
import { getUser } from "../reducers";
import { connect } from "react-redux";

const Login = ({onSubmit, user, navigation}) => {
  const [loginConfig, setLoginConfig] = useState({
    iosClientId: '269141253852-sfvud8v5grcbku07bu7ncqrt55k56gss.apps.googleusercontent.com',
    androidClientId: '269141253852-b4c1k1n4100dd87hjmehva5l7r81u06n.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'openid']
  });
  const [authState, setAuthState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = async () => {
    const authState = await Google.logInAsync(loginConfig);
    console.log('signInAsync', authState);
    setAuthState(authState);
    onSubmit({
      id: authState.user.id,
      name: authState.user.name,
      idToken: authState.idToken,
    }).then(() => navigation.replace('Dashboard'));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ChefPlanète</Text>
      {
        authState == null &&
        <Button title="Google Sign In" onPress={login}/>
      }
      {
        authState != null &&
        <View>
          <Text style={styles.text}>Id: {authState.user.id}</Text>
          <Text style={styles.text}>Id Token: {authState.idToken}</Text>
          <Text style={styles.text}>User Name: {authState.user.name}</Text>
        </View>
      }
      {
        user != null &&
        <Text style={styles.text}>{user.name} is logged in.</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "rgba(20,19,19,1)"
  },
  text: {
    color: "rgba(238,243,233,1)",
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
});

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit: signInUser}, dispatch);

export const mapStateToProps = state => ({
  user: !state.user.data ? null : getUser(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);