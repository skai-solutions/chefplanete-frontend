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
    console.log("Item being added...");
    onSubmit({
      [itemKey]: {
        name: name,
        unitName: unit,
        quantity: quantity,
      },
    }).catch(error => console.log(error));

  };

  const editItem = (name,unit,quantity) => {
    onSubmit({
        name: name,
        unitName: unit,
        quantity: quantity,
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
                    <Button style={styles.button} onPress={() => setEditModalVisible(true)}>
                      <Icon name="keypad"/>
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
                />
                <Input
                  keyboardType="decimal-pad"
                  placeholder="Quantity"
                />
                <Picker
                  iosIcon={<Icon style={{color: "black"}} name="arrow-down" />}
                  mode="dropdown"
                  placeholderIconColor="white"
                  textStyle={styles.unitSelection}
                >
                  <Picker.Item label="grams" value="grams" />
                  <Picker.Item label="kg" value="kg" />
                </Picker>
              </Item>
              <Button style={styles.button}onPress={() => {
                setAddModalVisible(!addModalVisible);
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
              <Button style={styles.button}onPress={() => {
                setEditModalVisible(!editModalVisible);
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
    justifyContent: "center",
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
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(MyFridge);