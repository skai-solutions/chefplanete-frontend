import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image } from "react-native";
import * as Google from 'expo-google-app-auth';
import { bindActionCreators } from "redux";
import { signInUser } from "../actions/userActions";
import { dietaryProfileIsLoading, getUser, getUserErrors, userIsLoading } from "../reducers";
import { connect } from "react-redux";
import * as Font from 'expo-font';
import GoogleSignInButton from '../assets/signin_google_2x.png';

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit: signInUser}, dispatch);

export const mapStateToProps = state => ({
  user: !state.user.data ? null : getUser(state),
  userLoading: userIsLoading(state),
  errors: getUserErrors(state),
  profileLoading: dietaryProfileIsLoading(state),
});

const Login = ({onSubmit, user, userLoading, profileLoading, navigation, errors}) => {
  const [loginConfig] = useState({
    iosClientId: '269141253852-sfvud8v5grcbku07bu7ncqrt55k56gss.apps.googleusercontent.com',
    androidClientId: '269141253852-b4c1k1n4100dd87hjmehva5l7r81u06n.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'openid']
  });
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      'pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  });
  const [isErrorState, setErrorState] = useState(false);
  const [authState, setAuthState] = useState(null);
  const login = async () => {
    const authState = await Google.logInAsync(loginConfig).catch(() => null);
    setErrorState(false);
    if (authState) {
      setAuthState(authState);
      onSubmit({
        id: authState.user.id,
        name: authState.user.name,
        idToken: authState.idToken,
      }).then(() => navigation.replace('Dashboard'))
        .catch(() => setErrorState(true));
    }
  };
  return (
    <View style={styles.container}>
      {
        fontLoaded &&
        <Text allowFontScaling style={styles.heading}>ChefPlanète</Text>
      }
      <TouchableOpacity style={{alignSelf: "center"}} onPress={login}>
        <Image style={styles.googleSignInButton} source={GoogleSignInButton}/>
      </TouchableOpacity>
      {
        (userLoading || profileLoading) &&
        <View>
          <Text style={styles.text}>LOADING...</Text>
        </View>
      }
      {
        isErrorState &&
        <View>
          <Text style={styles.text}>There was an error signing in!</Text>
          <Text style={styles.errorText}>{errors}</Text>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "rgba(20,19,19,1)",
    justifyContent: "center",
  },
  text: {
    color: "rgb(238,243,233)",
    textAlign: "center",
  },
  errorText: {
    color: "rgba(243,130,76,1)",
    textAlign: "center",
  },
  googleSignInButton: {
    width: 250,
    resizeMode: 'contain'
  },
  heading: {
    fontFamily: 'pacifico',
    width: '80%',
    height: "10%",
    color: "rgb(0,183,24)",
    fontSize: 48,
    textAlign: "center",
    marginTop: "25%",
    alignSelf: "center"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);