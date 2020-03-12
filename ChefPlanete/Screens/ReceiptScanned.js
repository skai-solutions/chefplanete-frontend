import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image} from "react-native";
import {bindActionCreators} from "redux";
import {scanReceipt} from "../actions/cameraActions";
import {getIngredients, cameraIsLoading, getIngredientsErrors} from "../reducers";
import {connect} from "react-redux";


export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit:scanReceipt}, dispatch);

export const mapStateToProps = state => ({
  ingredients: !state.camera.data ? null : getIngredients(state),
  ingredientsLoading: cameraIsLoading(state),
  errors: getIngredientsErrors(state),
});

const ReceiptScanned = ({onSubmit, ingredients, ingredientsLoading, errors, navigation}) => {
  const [isErrorState, setErrorState] = useState(false);
  // if(errors === null){
  //   //get the first element of the array of the returned body: item names
  //   const ingredientsToDisplay = ingredients[0];
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ChefPlanète</Text>
      {
        ingredientsLoading &&
        <View>
          <Text style={styles.text}>LOADING...</Text>
        </View>
      }
      {
        (ingredients && !ingredientsLoading) && ingredients.map(({ingredientName}) => <Text key={ingredientName} style={styles.text}>{ingredientName}</Text>)
      }
      {
        errors &&
        <View>
          <Text style={styles.text}>There was an error loading ingredients!</Text>
          <Text style={styles.errorText}>{errors}</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "rgba(20,19,19,1)"
  },
  text: {
    color: "rgb(238,243,233)",
    textAlign: "center",
  },
  errorText: {
    color: "rgba(243,130,76,1)",
    textAlign: "center",
  },
  heading: {
    width: '80%',
    height: "10%",
    color: "rgba(238,243,233,1)",
    fontSize: 48,
    textAlign: "center",
    marginTop: "25%",
    alignSelf: "center"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptScanned);