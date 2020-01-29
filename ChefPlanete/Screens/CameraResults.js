import React, { useState, useEffect } from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image} from "react-native";
import {Card, CardItem, Body, Content} from "native-base"
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
  const [isErrorState, setErrorState] = useState(false);
  const [isSetup, setSetup] = useState(false);
  const [identifiedItems, setIdentifiedItems] = useState({});
  
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
      setIdentifiedItems(receiptIngredients);
      console.log("SETTING IDENTIFIED ITEMS:", receiptIngredients);
      setSetup(true);
    }
  }, [loading]);
  
  const updateIngredientQuantity = (inputQuantity, itemKey) => {
    console.log("updating item: ", inputQuantity, itemKey);
    setIdentifiedItems({
      ...identifiedItems,
      [itemKey]: {
        ...identifiedItems[itemKey],
        quantity: inputQuantity,
      }
    })
  }
  
  const approveIngredientList = () => {
    console.log("Sending ingredients...");
    console.log("ingredients: ", identifiedItems);
    onSubmit(identifiedItems).then(() => navigation.replace('MyFridge'))
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
        Object.entries(identifiedItems).sort(([keyA], [keyB]) => {
          if(keyA > keyB) return -1;
          if(keyB > keyA) return 1;
          return 0;
        }).map(([key,value]) => {
          return (
            <Card key={key}>
            <CardItem>
            <Body>
            <Text style={styles.text}>{value.name}</Text>
            <TextInput
            style={{ height: 10, borderColor: 'gray', borderWidth: 1 }}
            keyboardType="number-pad"
            onChangeText={(newText) => updateIngredientQuantity(newText, key)}
            value={value.quantity}
            />
            </Body>
            </CardItem>
            </Card>
            );
          }):null
        }    
        {
          isErrorState &&
          <View>
          <Text style={styles.text}>There was an error loading the ingredients!</Text>
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