import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableHighlight, Modal } from "react-native";
import { Container, Body, Card, CardItem, Icon, Content, Button, Item, Input, Picker, Text } from 'native-base';
import NavigationBar from '../components/NavigationBar';
import { cameraIsLoading, getIngredients, getIngredientsErrors, getPantry } from "../reducers";
import { updateUserPantry } from "../actions/pantryActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Font from 'expo-font';
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";
import setValueForStyles from "react-native-web/dist/vendor/react-dom/setValueForStyles";
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import convert from 'convert-units';


export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit: updateUserPantry}, dispatch);

export const mapStateToProps = state => ({
  ingredients: !state.camera.data ? null : getIngredients(state),
  loading: cameraIsLoading(state),
  errors: getIngredientsErrors(state),
  pantry: !state.pantry.data ? null : getPantry(state),
  modalVisible: false
});

const MyFridge = ({onSubmit, navigation, pantry}) => {

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [newName, setNewName] = useState(null);
  const [newUnit, setNewUnit] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);

  const [editKey, setEditKey] = useState(null);
  const [editName, setEditName] = useState(null);
  const [editUnit, setEditUnit] = useState(null);
  const [editQuantity, setEditQuantity] = useState(null);


  const removeItem = (itemKey) => {
    onSubmit({
      [itemKey]: {
        name: 'TO BE REMOVED',
        unitName: 'R',
        quantity: 0,
      },
    }).catch(error => console.log(error));
  };

  const addItem = (name, unit, quantity) => {
    onSubmit({
      [name.toLowerCase()]: {
        name: name,
        unitName: unit,
        quantity: quantity,
      },
    }).catch(error => console.log(error));
  };

  const units = convert().possibilities('mass', 'volume')

  const map1 = units.map(unit => {
    return (
      {
        label: unit,
        value: unit
      }
    )
  });

  return (
    <Container style={styles.container}>

      <PageHeader title="My Fridge"/>
      <Content style={{paddingVertical: 10, paddingHorizontal: 15}}>
        <Button style={styles.button} onPress={() => setAddModalVisible(true)}>
          <Text styel={styles.buttonText}>Add Ingredient</Text>
        </Button>
        {
          Object.entries(pantry).map(([key, value]) => {
            return (
              <Card style={styles.card} key={key}>
                <CardItem style={styles.card}>
                  <Body style={styles.itemView}>
                    <Text adjustsFontSizeToFit style={styles.item}>{value.name} {value.quantity} {value.unitName}</Text>
                    <Button style={{...styles.button, width: 50}}
                            onPress={() => setEditKey(key) || setEditName(value.name) || setEditUnit(value.unitName) || setEditQuantity(value.quantity) || setEditModalVisible(true)}>
                      <Icon name="settings"/>
                    </Button>
                    <View style={{flex: 0.1}}/>
                    <Button style={{...styles.button, width: 100}} onPress={() => removeItem(key)}>
                      <Icon name="close"/>
                    </Button>
                  </Body>
                </CardItem>
              </Card>
            )
          })
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => {
          }}>
          <Container style={styles.container}>
            <PageHeader title="Add Ingredient"/>
            <Content style={{paddingVertical: 40, paddingHorizontal: 15}}>
              <Item>
                <Text>Ingredient Name:</Text>
                <Input
                  onChangeText={(newText) => setNewName(newText)}
                />
              </Item>
              <Item>
                <Text>Quantity:</Text>
                <Input
                  keyboardType="decimal-pad"
                  onChangeText={(newText) => setNewQuantity(newText)}
                />
              </Item>
              <Item style={{paddingVertical: 15}}>
                <Text>Unit:</Text>
                <RNPickerSelect
                  placeholder={{
                    label: 'Select Unit',
                    value: null,
                  }}
                  placeholderTextColor="black"
                  style={{
                    ...pickerSelectStyles,
                    placeholder: {
                      color: 'black',
                      fontSize: 16
                    },
                  }}
                  items={map1}
                  onValueChange={(itemValue) => setNewUnit(itemValue)}
                  value={newUnit}
                />
              </Item>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15}}>
                <Button style={{...styles.button, width: 100}} onPress={() => {
                  addItem(newName, newUnit, newQuantity) || setAddModalVisible(!addModalVisible);
                }}>
                  <Text adjustsFontSizeToFit>Add</Text>
                </Button>
                <View style={{flex: 0.2}}/>
                <Button style={{...styles.button, width: 100}} onPress={() => navigation.replace("MyFridge")}>
                  <Text adjustsFontSizeToFit>Back</Text>
                </Button>
              </View>
            </Content>
          </Container>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => {
          }}>
          <Container style={styles.container}>
            <PageHeader title="Edit Ingredient"/>
            <Content style={{paddingVertical: 10, paddingHorizontal: 15}}>
              <Item style={{flex: 4}} underline>
                <Text>Name: </Text>
                <Input
                  style={styles.nameInput}
                  value={editName}
                  onChangeText={(newText) => setEditName(newText)}
                />
              </Item>

              <Item style={{flex: 4}}>
                <Text>Quantity: </Text>
                <Input
                  style={styles.quantityInput}
                  keyboardType='numeric'
                  value={`${editQuantity}`}
                  onChangeText={(newText) => setEditQuantity(newText)}
                />
              </Item>
              <Item style={{paddingVertical: 15}}>
                <Text>Unit:</Text>
                <RNPickerSelect
                  placeholder={{
                    label: editUnit,
                    value: null,
                  }}
                  placeholderTextColor="black"
                  style={{
                    ...pickerSelectStyles,
                    placeholder: {
                      color: 'black',
                      fontSize: 16
                    },
                  }}
                  items={map1}
                  onValueChange={(itemValue) => setNewUnit(itemValue)}
                  value={newUnit}
                />
              </Item>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15}}>
                <Button style={{...styles.button, width: 100}} onPress={() => {
                  removeItem(editKey) || addItem(editName, editUnit, editQuantity) || setEditModalVisible(!editModalVisible);
                }}>
                  <Text adjustsFontSizeToFit>Confirm</Text>
                </Button>
                <View style={{flex: 0.2}}/>
                <Button style={{...styles.button, width: 100}} onPress={() => navigation.replace("MyFridge")}>
                  <Text adjustsFontSizeToFit>Back</Text>
                </Button>
              </View>
            </Content>
          </Container>
        </Modal>
      </Content>
      <NavigationBar currentScreen="FRIDGE"/>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleVars.background,
  },
  heading: {
    fontFamily: 'pacifico',
    color: StyleVars.headingColor,
    fontSize: 45,
    textAlign: "center",
  },
  item: {
    fontFamily: 'SF Pro Display Bold',
    flex: 2,
    fontSize: 18,
    color: "black",
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 8,
    backgroundColor: StyleVars.cardBackground,
  },
  buttonText: {
    color: "white",
  },
  icon: {
    fontSize: 30,
    color: "black",
    lineHeight: 20,
    top: "90%",
    flexDirection: "row-reverse",
  },
  itemView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nameInput: {
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
  picker: {
    fontFamily: "SF Pro Display Bold",
    backgroundColor: StyleVars.headingColor,
  },
  quantityInput: {
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
  unitSelection: {
    fontFamily: "SF Pro Display Bold",
    color: StyleVars.headingColor,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderColor: 'gray',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFridge);