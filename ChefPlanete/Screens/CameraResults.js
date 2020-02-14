import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {
  Card,
  Icon,
  CardItem,
  Body,
  Button,
  Container,
  Content,
  Header,
  Item,
  Picker,
  Row,
  Title,
  Input
} from "native-base"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { cameraIsLoading, getIngredients, getIngredientsErrors, getPantry } from "../reducers";
import { updateUserPantry } from "../actions/pantryActions";
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit: updateUserPantry}, dispatch);

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
    if (!loading && ingredients && !isSetup) {
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
    } else {
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
  };

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
  };

  const updateIngredientName = (ingredientName, ingredientKey) => {
    console.log("updating ingr unitName: ", ingredientName, ingredientKey);
    setIdentifiedIngredients({
      //Copy the other identifiedIngredients with the spread operator so we don't overwrite them
      ...identifiedIngredients,
      [ingredientKey]: {
        //Copy the other key/vals in the ingredient with the spread operator so we don't overwrite them
        ...identifiedIngredients[ingredientKey],
        name: ingredientName,
      }
    })
  };

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
  };

  return (
    <Container style={styles.container}>
      <PageHeader title="Receipt Items" />
      <Content style={styles.receiptItems}>
        {
          isSetup && !loading ?
            Object.entries(identifiedIngredients).sort(([keyA], [keyB]) => {
              if (keyA > keyB) return -1;
              if (keyB > keyA) return 1;
              return 0;
            }).map(([key, value]) => {
              const stringQuantity = value.quantity.toString();
              return (
                <Card style={styles.card} key={key}>
                  <CardItem style={styles.card}>
                    <Body style={styles.receiptItem}>
                      <Item style={{flex: 4}} underline>
                        <Input
                          style={styles.nameInput}
                          onChangeText={(newText) => updateIngredientName(newText, key)}
                          value={value.name}
                        />
                      </Item>
                      <Item style={{flex: 4}}>
                        <Input
                          style={styles.quantityInput}
                          keyboardType="decimal-pad"
                          onChangeText={(newText) => updateIngredientQuantity(newText, key)}
                          value={stringQuantity}
                        />
                        <Picker
                          iosIcon={<Icon style={{color: "white"}} name="arrow-down" />}
                          mode="dropdown"
                          selectedValue={value.unitName}
                          placeholderIconColor="white"
                          textStyle={styles.unitSelection}
                          onValueChange={(itemValue) => updateIngredientUnitName(itemValue, key)}
                        >
                          <Picker.Item label="grams" value="grams" />
                          <Picker.Item label="kg" value="kg" />
                        </Picker>
                      </Item>
                    </Body>
                  </CardItem>
                </Card>
              );
            }) : <Text adjustsFontSizeToFit style={styles.heading}>Identifying items from receipt image...</Text>
        }
        {
          isErrorState &&
          <View>
            <Text style={styles.text}>Error(s) loading the ingredients.</Text>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
        }
        {
          !loading &&
          <View style={styles.buttonContainer}>
            <Button style={styles.approveButton} onPress={approveIngredientList}>
              <Text adjustsFontSizeToFit style={styles.buttonText}>Approve</Text>
            </Button>
            <Button style={styles.cancelButton} onPress={() => navigation.replace("Dashboard")}>
              <Text adjustsFontSizeToFit style={styles.buttonText}>Cancel</Text>
            </Button>
          </View>
        }
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  nameInput: {
    fontFamily: "SF Pro Display Bold",
    color: "black",
  },
  picker: {
    fontFamily: "SF Pro Display Bold",
    backgroundColor: "black",
  },
  quantityInput: {
    fontFamily: "SF Pro Display Bold",
    color: "black",
  },
  unitSelection: {
    fontFamily: "SF Pro Display Bold",
    color: "black"
  },
  receiptItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonText: {
    fontFamily: "SF Pro Display Bold",
  },
  approveButton: {
    borderRadius: 8,
    width: "45%",
    alignSelf: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderRadius: 8,
    width: "45%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "rgba(243,130,76,1)"
  },
  titleHeader: {
    fontFamily: "SF Pro Display Heavy",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    color: "rgb(0,57,7)",
    fontSize: 25,
    paddingBottom: "3%",
  },
  receiptItems: {
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  card: {
    borderRadius: 8,
    backgroundColor: StyleVars.cardBackground,
  },
  container: {
    backgroundColor: "black",
    flex: 5,
  },
  errorText: {
    color: "rgba(243,130,76,1)",
    textAlign: "center",
    fontFamily: "SF Pro Display Bold",
  },
  heading: {
    fontFamily: "SF Pro Display Bold",
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
  },
  text: {
    color: "rgb(0,0,0)",
    fontSize: 20,
    textAlign: "center",
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(CameraResults);