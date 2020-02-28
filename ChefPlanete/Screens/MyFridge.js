import React, {Component, useState} from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Modal} from "react-native";
import {Container, Body, Card, CardItem, Icon, Content, Button, Item, Input, Picker} from 'native-base';
import NavigationBar from '../components/NavigationBar';
import {cameraIsLoading, getIngredients, getIngredientsErrors, getPantry} from "../reducers";
import { updateUserPantry } from "../actions/pantryActions";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import * as Font from 'expo-font';
import PageHeader from "../components/PageHeader";
import StyleVars from "../styles/variables";
import setValueForStyles from "react-native-web/dist/vendor/react-dom/setValueForStyles";

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit: updateUserPantry}, dispatch);

export const mapStateToProps = state => ({
  ingredients: !state.camera.data ? null : getIngredients(state),
  loading: cameraIsLoading(state),
  errors: getIngredientsErrors(state),
  pantry: !state.pantry.data ? null : getPantry(state),
  modalVisible: false
});

const MyFridge = ({onSubmit,navigation, pantry}) => {

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

  const addItem = (name,unit,quantity) => {
    onSubmit({
      [name.toUpperCase()]: {
        name: name,
        unitName: unit,
        quantity: quantity,
      },
    }).catch(error => console.log(error));
  };

  const editItem = (name,unit,quantity) => {
    onSubmit({
      [name.toUpperCase()]: {
        name: name,
        unitName: unit,
        quantity: quantity,
      },
    }).catch(error => console.log(error));
  };

  const {navigate} = navigation;

  return (

    <Container style={styles.container}>

      <PageHeader title="My Fridge" />
      <Content style={{paddingVertical: 10, paddingHorizontal: 15}}>
        <Button small style={styles.button} onPress={() => setAddModalVisible(true)}>
          <Text>Add Ingredient</Text>
        </Button>
        {
          Object.entries(pantry).map(([key, value]) => {
            return (
              <Card style={styles.card} key={key}>
                <CardItem style={styles.card}>

                  <Body style={styles.itemView}>
                    {<Text adjustsFontSizeToFit style={styles.item} key={key}>{value.name} {value.quantity} {value.unitName}</Text>}

                    <Button style={styles.button } key={key} onPress={() => setEditKey(key) ||setEditName(value.name) || setEditUnit(value.unitName) || setEditQuantity(value.quantity) ||setEditModalVisible(true)}>
                      <Icon name="settings"/>
                    </Button>
                    <Button style={styles.button} onPress={() => removeItem(key)}>
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
          <Container>
            <PageHeader title="Add Ingredient" />
            <Content>
              <Item>
                <Input
                  placeholder="Name"
                  onChangeText={(newText) => setNewName(newText)}
                />
              </Item>
              <Item>
                <Input
                  keyboardType="decimal-pad"
                  placeholder="Quantity"
                  onChangeText={(newText) => setNewQuantity(newText)}
                />
                <Picker
                  iosIcon={<Icon style={{color: "black"}} name="arrow-down" />}
                  mode="dropdown"
                  placeholderIconColor="white"
                  textStyle={styles.unitSelection}
                  onValueChange={(itemValue) => setNewUnit(itemValue)}
                >
                  <Picker.Item label="grams" value="grams" />
                  <Picker.Item label="kg" value="kg" />
                </Picker>
              </Item>
              <Button style={styles.button}onPress={() => {
                addItem(newName,newUnit,newQuantity) || setAddModalVisible(!addModalVisible);
              }}>
                <Text>Add</Text>
              </Button>
            </Content>
          </Container>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => {
          }}>
          <Container>
            <PageHeader title="Edit Ingredient" />
            <Content>
              <Item style={{flex: 4}} underline>
                <Input
                  style={styles.nameInput}
                  onChangeText={(newText) => setNewName(newText)}
                  value={editName}
                />
              </Item>
              <Item style={{flex: 4}}>
                <Input
                  style={styles.quantityInput}
                  keyboardType="decimal-pad"
                  onChangeText={(newText) => setNewQuantity(newText)}
                  value={editQuantity}
                />
                <Picker
                  iosIcon={<Icon style={{color: "black"}} name="arrow-down" />}
                  mode="dropdown"
                  placeholderIconColor="white"
                  textStyle={styles.unitSelection}
                  value={editUnit}
                  onValueChange={(itemValue) => setNewUnit(itemValue)}
                >
                  <Picker.Item label="grams" value="grams" />
                  <Picker.Item label="kg" value="kg" />
                </Picker>
              </Item>
              <Button style={styles.button}onPress={() => {
                removeItem(editKey) || editItem(newName,newUnit,newQuantity) || setEditModalVisible(!editModalVisible);
              }}>
                <Text>Confirm</Text>
              </Button>
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
    flex: 5,
    fontSize: 18,
    color: "black",
  },
  button: {
    flex: 1,
    justifyContent: 'space-between'
  },
  card: {
    borderRadius: 8,
    backgroundColor: StyleVars.cardBackground,
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

export default connect(mapStateToProps,mapDispatchToProps)(MyFridge);