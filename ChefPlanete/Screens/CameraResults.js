import React, { useState, useEffect } from "react";
import {Button, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {Card, CardItem, Body, Content, Picker, Row} from "native-base"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {cameraIsLoading, getIngredients, getIngredientsErrors, getPantry} from "../reducers";
import {updateUserPantry} from "../actions/pantryActions";

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit:updateUserPantry}, dispatch);

export const mapStateToProps = state => ({
  ingredients: !state.camera.data ? null : getIngredients(state),
  loading: cameraIsLoading(state),
  errors: getIngredientsErrors(state),
  pantry: !state.pantry.data ? null : getPantry(state)
});

const CameraResults = ({onSubmit, ingredients, loading, pantry, errors, navigation}) => {
  const [isErrorState, setErrorState] = useState(false);
  const [isSetup, setSetup] = useState(false);
  const [identifiedIngredients, setIdentifiedIngredients] = useState({});
  
  useEffect(() => {
    if (ingredients && !isSetup){
      var receiptIngredients = {};
      ingredients.forEach((item) =>
        receiptIngredients[item.ingredientName.toUpperCase()] = {
          name: item.ingredientName,
          quantity: 1,
          unitName: "grams"
        }
      );
      setIdentifiedIngredients(receiptIngredients);
      console.log("SETTING IDENTIFIED ITEMS:", receiptIngredients);
      setSetup(true);
    }
  }, [loading]);
  
  const updateIngredientQuantity = (inputQuantity, ingredientKey) => {
    console.log("updating ingr qty: ", inputQuantity, ingredientKey);
    if (inputQuantity && inputQuantity !== "") {
      inputQuantity = parseFloat(inputQuantity);
    }
    else {
      inputQuantity = 0;
    }
    setIdentifiedIngredients({
      //Copy the other identifiedIngredients with the spread operator so we don't overwrite them
      ...identifiedIngredients,
      [ingredientKey]: {
        //Copy the other key/vals in the ingredient with the spread operator so we don't overwrite them
        ...identifiedIngredients[ingredientKey],
        quantity: inputQuantity,
      }
    })
  }

  const updateIngredientUnitName = (unitName, ingredientKey) => {
    console.log("updating ingr unitName: ", unitName, ingredientKey);
    setIdentifiedIngredients({
      //Copy the other identifiedIngredients with the spread operator so we don't overwrite them
      ...identifiedIngredients,
      [ingredientKey]: {
        //Copy the other key/vals in the ingredient with the spread operator so we don't overwrite them
        ...identifiedIngredients[ingredientKey],
        unitName: unitName,
      }
    })
  }
  
  const approveIngredientList = () => {
    console.log("Sending ingredients...");
    console.log("ingredients: ", identifiedIngredients);
    //Check if ingredient is already in pantry
    // if (ingredientKey in pantry) {
    //   //Add already existing quantity to new specified quantity
    //   inputQuantity += pantry[ingredientKey].quantity;
    // }
    //Send identifiedIngredients through updatePantry action
    onSubmit(identifiedIngredients).then(() => navigation.replace('MyFridge'))
    .catch(() => setErrorState(true));
  }
  
  return (
    <View style={styles.container}>
      {
        loading &&
        <Text style={styles.heading}>Identifying items from receipt image...</Text>
      }
      {
        !loading &&
        <Text style={styles.heading}>We have identified the following items:</Text>
      }
      {
        loading &&
        <View>
          <Text style={styles.text}>LOADING...</Text>
        </View>
      }
      <ScrollView>
        <View style={{marginLeft: "10%", marginRight: "10%"}}>
          {
            isSetup ? 
            Object.entries(identifiedIngredients).sort(([keyA], [keyB]) => {
              if(keyA > keyB) return -1;
              if(keyB > keyA) return 1;
              return 0;
            }).map(([key,value]) => {
              const stringQuantity = value.quantity.toString();
              return (
                <Card key={key} transparent>
                  <CardItem style={{backgroundColor: "grey"}}>
                    <Body>
                      <View style={styles.card}>
                        <View style={styles.ingredientName}>
                          <Text style={styles.ingredientText} adjustsFontSizeToFit>{value.name}</Text>
                        </View>
                        <View style={styles.ingredientDetails}>
                          <TextInput
                            style={styles.textInput}
                            keyboardType="number-pad"
                            onChangeText={(newText) => updateIngredientQuantity(newText, key)}
                            value={stringQuantity}
                          />
                        </View>
                        <View style={styles.ingredientDetails}>
                          <Picker
                            selectedValue={value.unitName}
                            style={{height: 50, width: 120}}
                            onValueChange={(itemValue) => updateIngredientUnitName(itemValue, key)}
                          >
                            <Picker.Item label="grams" value="grams" />
                            <Picker.Item label="kg" value="kg" />
                          </Picker>
                        </View>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              );
            }):null
          }
        </View>
      </ScrollView>
      {
        isErrorState &&
        <View>
          <Text style={styles.text}>Error(s) loading the ingredients.</Text>
          <Text style={styles.errorText}>{errors}</Text>
        </View>
      }
      {
        !loading &&
        <Button title="Approve" onPress={approveIngredientList} color="rgba(94,167,11,1)"/>
      }
    </View>
  );
}
    
  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      flex: 3,
    },
    container: {
      backgroundColor: "rgba(20,19,19,1)",
      flex: 5,
    },
    errorText: {
      color: "rgba(243,130,76,1)",
      textAlign: "center",
    },
    heading: {
      color: "rgba(94,167,11,1)",
      fontSize: 30,
      textAlign: "center",
      marginTop: "10%",
    },
    ingredientName: {
      flex: 2,
      marginRight: "5%",
    },
    ingredientQuantity: {
      flex: 1,
      marginRight: "5%",
    },
    ingredientUnitName: {
      flex: 2,
      marginLeft: "5%",
    },
    ingredientText: {
      color: "rgb(238,243,233)",
      fontSize: 20,
      textAlign: "left",
    },
    text: {
      color: "rgb(238,243,233)",
      fontSize: 20,
      textAlign: "center",
    },
    textInput: {
      borderColor: 'gray', 
      borderWidth: 1,
      height: 30,
    }
  });
export default connect(mapStateToProps, mapDispatchToProps)(CameraResults);