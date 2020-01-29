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
  const [identifiedItems, setIdentifiedItems] = useState({});

  // useEffect(() => {
  //   if (ingredients && !loading) {
  //     var receiptIngredients = {};
  //     ingredients.forEach((item) => {
  //       receiptIngredients[item.ingredientName.toUpperCase()] = {
  //         name: item.ingredientName,
  //         quantity: 1,
  //         unitName: "self"
  //       }
  //     })
  //     console.log("SETTING IDENTIFIED ITEMS:", identifiedItems);
  //     setIdentifiedItems(receiptIngredients)
  //   }
  // });

  const approveIngredientList = () => {
    console.log("Sending ingredients...");
    var receiptIngredients = {};
    ingredients.forEach((item) => {
      receiptIngredients[item.ingredientName.toUpperCase()] = {
        name: item.ingredientName,
        quantity: 1,
        unitName: "self"
      }
    })
    console.log("ingredients: ", receiptIngredients);
    onSubmit(receiptIngredients).then(() => navigation.replace('MyFridge'))
      .catch(() => setErrorState(true));
  }

  // const onChangeIdentifiedItems = (itemKey) => {
  //   setIdentifiedItems({
  //     ...identifiedItems,
  //     itemKey: {
  //       name: "test",
  //       quantity: 100,
  //       unitName: "TesT"
  //     }
  //   })
  // }

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
        {/* {
          !loading && 
          Object.entries(identifiedItems).map(([key,value]) => {
            <Card>
              <CardItem>
                <Body>
                  <Text>TEST</Text>
                  <Text style={styles.text} key={key}>{value.name}</Text>
                  <TextInput
                    style={{ height: 10, borderColor: 'gray', borderWidth: 1 }}
                    keyboardType="number-pad"
                    onChangeText={onChangeIdentifiedItems}
                    value={value.quantity}
                  />
                </Body>
              </CardItem>
            </Card>
          })
        } */}
        {/* {
          (Object.keys(identifiedItems).length != 0 && !loading) && 
          Object.entries(identifiedItems).map(([key,value]) => {
            <Text key={key} style={styles.text}>{value.name}</Text>
          })
        } */}
        {
          (ingredients && !loading) && 
          ingredients.map(({ingredientName}) => <Text key={ingredientName} style={styles.text}>{ingredientName}</Text>)
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
          <Content>
            <Button title="Approve" onPress={approveIngredientList}/>
            <Card>
              <CardItem>
                <Body>
                  <Text>
                    COOL TEXT
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
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