import React, { useState, useEffect } from "react";
import {StyleSheet, Text, TextInput, View, Button, Picker, ScrollView} from "react-native";
import {Card, CardItem, Body, Content, Row} from "native-base"
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
          unitName: "self"
        }
      );
      setIdentifiedIngredients(receiptIngredients);
      console.log("SETTING IDENTIFIED ITEMS:", receiptIngredients);
      setSetup(true);
    }
  }, [loading]);
  
  const updateIngredientQuantity = (inputQuantity, ingredientKey) => {
    console.log("updating ingr qty: ", inputQuantity, ingredientKey);
    //Check if ingredient is already in pantry
    if (ingredientKey in pantry) {
      //Add already existing quantity to new specified quantity
      inputQuantity += pantry[ingredientKey].quantity;
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
    //Send identifiedIngredients through updatePantry action
    onSubmit(identifiedIngredients).then(() => navigation.replace('MyFridge'))
    .catch(() => setErrorState(true));
  }
  
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
        isSetup ? 
        Object.entries(identifiedIngredients).sort(([keyA], [keyB]) => {
          if(keyA > keyB) return -1;
          if(keyB > keyA) return 1;
          return 0;
        }).map(([key,value]) => {
          return (
            <Card key={key} transparent>
              <CardItem style={{backgroundColor: "blue"}}>
                <Body>
                  <View style={styles.card}>
                    <Text style={styles.text}>{value.name}</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="number-pad"
                      onChangeText={(newText) => updateIngredientQuantity(newText, key)}
                      value={value.quantity}
                    />
                    <Picker
                      selectedValue={value.unitName}
                      style={{height: 50, width: 100}}
                      onValueChange={(itemValue) => updateIngredientUnitName(itemValue, key)}
                    >
                      <Picker.Item label="self" value="self" />
                      <Picker.Item label="grams" value="grams" />
                      <Picker.Item label="lbs" value="lbs" />
                    </Picker>
                  </View>
                </Body>
              </CardItem>
            </Card>
          );
        }):null
        }
        {
          isErrorState &&
          <View>
            <Text style={styles.text}>Error(s) loading the ingredients.</Text>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
        }
      </View>
      <View style={styles.footer}>
        {
          !loading &&
          <Button title="Approve" onPress={approveIngredientList}/>
        }
      </View>
    </View>
  );
}
    
  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
    },
    container: {
      backgroundColor: "rgba(20,19,19,1)",
      flex: 6,
    },
    errorText: {
      color: "rgba(243,130,76,1)",
      textAlign: "center",
    },
    footer: {
      backgroundColor: "rgba(20,19,19,1)",
      flex: 1,
      marginBottom: "5%",
    },
    heading: {
      color: "rgba(94,167,11,1)",
      fontSize: 30,
      textAlign: "center",
    },
    header: {
      backgroundColor: "rgba(20,19,19,1)",
      flex: 2,
      marginTop: "5%",
    },
    list: {
      backgroundColor: "rgba(20,19,19,1)",
      flex: 3,
      marginTop: "5%",
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