import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
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
  Input,
  Spinner,
} from "native-base"
import convert from "convert-units";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { cameraIsLoading, getIngredients, getIngredientsErrors, getPantry } from "../reducers";
import { updateUserPantry } from "../actions/pantryActions";
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";
import { Chevron } from "react-native-shapes";

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
      let receiptIngredients = {};
      ingredients.forEach((item) =>
        receiptIngredients[item.ingredientName.toLowerCase()] = {
          name: item.ingredientName.toLowerCase(),
          quantity: 1,
          unitName: "g",
          noMatchFound: pantry[item.ingredientName] === null || pantry[item.ingredientName] === undefined,
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

  const deleteIngredient = (key) => {
    const updatedResults = {...identifiedIngredients};
    delete updatedResults[key];
    setIdentifiedIngredients(updatedResults);
  };

  const updateIngredientName = (ingredientName, ingredientKey) => {
    console.log("updating ingr unitName: ", ingredientName, ingredientKey);
    setIdentifiedIngredients({
      //Copy the other identifiedIngredients with the spread operator so we don't overwrite them
      ...identifiedIngredients,
      [ingredientKey]: {
        //Copy the other key/vals in the ingredient with the spread operator so we don't overwrite them
        ...identifiedIngredients[ingredientKey],
        name: ingredientName.toLowerCase(),
      }
    })
  };

  const approveIngredientList = () => {
    console.log("Sending ingredients...");
    console.log("ingredients: ", identifiedIngredients);
    const pantryUpdate = Object.fromEntries(Object.entries(identifiedIngredients).map(([key, ingredient]) => {
      if (pantry[ingredient.name]) {
        const pantryIngredient = pantry[ingredient.name];
        try {
          const converted = convert(ingredient.quantity).from(ingredient.unitName).to(pantryIngredient.unitName);
          return [ingredient.name, {
            ...ingredient,
            quantity: Math.max(0, pantryIngredient.quantity + converted),
            unitName: pantryIngredient.unitName,
          }];
        } catch (e) {
          return ["", {...ingredient, quantity: 0}];
        }
      }
      else {
        return [ingredient.name, ingredient];
      }
    }));
    onSubmit(pantryUpdate).then(() => navigation.replace('MyFridge'))
      .catch(() => setErrorState(true));
  };

  return (
    <Container style={styles.container}>
      <PageHeader title="Receipt Items"/>
      <Content style={styles.receiptItems}>
        <View style={{flexDirection: "row", paddingVertical: 5}}>
          <Item style={{flexDirection: "row", flex: 4, borderColor: "transparent"}}>
            <View style={{flexDirection: "column", flex: 1}}>
              <Text style={{textAlign: "left"}} note>Name</Text>
            </View>
          </Item>
          <Item style={{flexDirection: "row", flex: 6, borderColor: "transparent"}}>
            <View style={{flexDirection: "column", flex: 2}}>
              <Text note>Quantity</Text>
            </View>
            <View style={{flexDirection: "column", flex: 2}}>
              <Text note>Unit</Text>
            </View>
            <View style={{flexDirection: "column", flex: 2}}/>
          </Item>
        </View>
        {
          isSetup && !loading ?
            Object.entries(identifiedIngredients).sort(([keyA], [keyB]) => {
              if (keyA > keyB) return -1;
              if (keyB > keyA) return 1;
              return 0;
            }).map(([key, value]) => {
              const stringQuantity = value.quantity.toString();
              const isValid = !isNaN(value.quantity) && value.name !== null;
              return (
                <View key={key} style={{flexDirection: "row", paddingVertical: 5}}>
                  <Item style={{flex: 8, flexDirection: "row"}} underline>
                    <View style={{flexDirection: "column", flex: 1}}>
                      <Input
                        style={styles.nameInput}
                        onChangeText={(newText) => updateIngredientName(newText, key)}
                        value={value.name}
                      />
                    </View>
                  </Item>
                  <Item style={{flex: 10, flexDirection: "row"}}>
                    <View style={{flexDirection: "column", flex: 5}}>
                      <Input
                        style={{
                          ...styles.quantityInput,
                          color: isValid ? StyleVars.headingColor : "#ffab29",
                        }}
                        keyboardType="decimal-pad"
                        onChangeText={(newText) => updateIngredientQuantity(newText, key)}
                        value={stringQuantity}
                      />
                    </View>
                    <View style={{flexDirection: "column", flex: 5}}>
                      <RNPickerSelect
                        style={pickerStyle}
                        items={convert().possibilities("mass").concat(convert().possibilities("volume")).map(unit => {
                          return {label: unit, value: unit}
                        })}
                        value={value.unitName}
                        onValueChange={(itemValue) => updateIngredientUnitName(itemValue, key)}
                        Icon={() => <Chevron color="gray" size={1.5}/>}
                      />
                    </View>
                    <View style={{flexDirection: "column", flex: 3}}>
                      <Button style={{justifyContent: "center"}} onPress={() => deleteIngredient(key)}>
                        <Icon name="close" color="white" />
                      </Button>
                    </View>
                  </Item>
                </View>
              );
            }) : <Spinner color="green" />
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
            <Button style={styles.cancelButton} onPress={() => navigation.replace("Dashboard")}>
              <Text adjustsFontSizeToFit style={styles.buttonText}>Cancel</Text>
            </Button>
            <Button style={styles.approveButton} onPress={approveIngredientList}>
              <Text adjustsFontSizeToFit style={styles.buttonText}>Approve</Text>
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
    color: StyleVars.headingColor,
  },
  picker: {
    fontFamily: "SF Pro Display Bold",
    backgroundColor: StyleVars.headingColor,
  },
  quantityInput: {
    textAlign: "right",
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
  unitSelection: {
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
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
    color: "white",
    fontFamily: "SF Pro Display Bold",
  },
  approveButton: {
    color: StyleVars.headingColor,
    width: "45%",
    alignSelf: "center",
    justifyContent: "center",
  },
  cancelButton: {
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
    color: StyleVars.brandSecondaryColor,
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
    backgroundColor: StyleVars.background,
    flex: 5,
  },
  errorText: {
    color: "rgba(243,130,76,1)",
    textAlign: "center",
    fontFamily: "SF Pro Display Bold",
  },
  heading: {
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.brandColor,
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

const pickerStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
  iconContainer: {
    top: "50%",
    right: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraResults);