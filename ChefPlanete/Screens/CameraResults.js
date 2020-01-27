import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image} from "react-native";
import {bindActionCreators} from "redux";
import {updateUserPantry} from "../actions/pantryActions";
import {getIngredients, cameraIsLoading, getIngredientsErrors} from "../reducers";
import {connect} from "react-redux";

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit:updateUserPantry}, dispatch);

export const mapStateToProps = state => ({
  ingredients: !state.camera.data ? null : getIngredients(state),
  loading: cameraIsLoading(state),
  errors: getIngredientsErrors(state),
});

const CameraResults = ({onSubmit, ingredients, loading, errors, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {
          loading &&
          <Text style={styles.heading}>Identifying items from receipt image...</Text>
        }
        {
          !loading &&
          <Text style={styles.heading}>We have identified the following items:</Text>
        }
      </View>
      <View style={styles.list}>
        {
          loading &&
          <View>
            <Text style={styles.text}>LOADING...</Text>
          </View>
        }
        {
          (ingredients && !loading) && ingredients.map(({ingredientName}) => <Text key={ingredientName} style={styles.text}>{ingredientName}</Text>)
        }
        {
          (errors && !loading) &&
          <View>
            <Text style={styles.text}>There was an error loading the ingredients!</Text>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
        }
      </View>
      <View style={styles.footer}>
        <Button title="Approve" onPress={approveIngredientList}/>
      </View>
    </View>
  );
}

const approveIngredientList = async () => {
  console.log("Sending ingredients...");
  // const ingredientList = {}
  console.log(ingredients);
  onSubmit(ingredients).catch(() => console.log("ERROR: Could not PUT ingredients to backend."));
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "rgba(20,19,19,1)",
  },
  errorText: {
    color: "rgba(243,130,76,1)",
    textAlign: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "rgba(20,19,19,1)",
    marginBottom: "5%",
  },
  heading: {
    color: "rgba(94,167,11,1)",
    fontSize: 45,
    textAlign: "center",
    marginTop: "10%"
  },
  header: {
    flex: 2,
    backgroundColor: "rgba(20,19,19,1)",
  },
  list: {
    flex: 3,
    backgroundColor: "rgba(20,19,19,1)",
    marginTop: "10%"
  },
  text: {
    color: "rgb(238,243,233)",
    textAlign: "center",
    fontSize: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraResults);