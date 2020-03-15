import React, { Component, useEffect, useState } from "react";
import {
  Tab,
  Tabs,
  TabHeading,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Spinner,
  Button,
  Container,
  Content,
  Text,
  Footer,
  FooterTab,
  Header,
  Icon,
  Input,
  Item,
  Title,
  Thumbnail,
  Card,
  CardItem
} from 'native-base';
import NavigationBar from '../components/NavigationBar';
import StyleVars from '../styles/variables';
import PageHeader from "../components/PageHeader";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { WebView } from 'react-native-webview';
import { getIngredientImageUrl } from "../services";


const RecipeDisplay = ({navigation, onSubmit}) => {
  const {recipeId} = navigation.state.params;
  const {recipeTitle} = navigation.state.params;
  const {recipeImage} = navigation.state.params;
  const {diets} = navigation.state.params;
  const {instructions} = navigation.state.params;
  const {summary} = navigation.state.params;
  const {ingredients} = navigation.state.params;
  const html = '<div style="font-family:verdana,serif;font-size: 300%; color: darkgreen;">' + summary + '</div>';

  return (
    <Container style={styles.container}>
      <PageHeader title="Recipe"/>
      <ScrollView>
        <Content style={styles.dashboard}>
          <Image style={{width: 373, height: 300}}
                 source={{uri: recipeImage,}}
          />
          <View>
            <Text adjustsFontSizeToFit style={styles.text}>{recipeTitle}</Text>
          </View>
          <Tabs initialPage={1} prerenderingSiblingsNumber={0}>
            <Tab heading={<TabHeading><Text>Summary</Text></TabHeading>}>
              <WebView source={{html: html}}/>
            </Tab>
            <Tab heading={<TabHeading><Text>Ingredients</Text></TabHeading>}>
              <List>
                {
                  ingredients.map(({amount, unit, name, image}) =>
                    <ListItem avatar key={name}>
                      <Left>
                        <Thumbnail source={{uri: image.includes("spoonacular") ? image : getIngredientImageUrl(image)}}/>
                      </Left>
                      <Body style={{height: "100%"}}>
                        <Text>{name}</Text>
                      </Body>
                      <Right>
                        <Text>{amount} {unit}</Text>
                      </Right>
                    </ListItem>)
                }
              </List>
            </Tab>
            <Tab heading={<TabHeading><Text>Instruction</Text></TabHeading>}>
              <List>
                {
                  instructions[0].steps.map(({number, step, ingredients, equipment}) =>
                    <ListItem key={number}>
                      <Card style={styles.cardItem}>
                        <CardItem header>
                          <Text style={styles.heading}>Step {number}</Text>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>{step}{"\n"}</Text>
                            {
                              ingredients.length > 0 ?
                                <View>
                                  <Text>Ingredients:
                                    {
                                      ingredients.map((item, key) =>
                                        <Text adjustsFontSizeToFit key={key}> {item.name},</Text>
                                      )
                                    }
                                  </Text>
                                </View> : null
                            }
                          </Body>
                        </CardItem>
                      </Card>

                    </ListItem>
                  )
                }
              </List>
            </Tab>
          </Tabs>


        </Content>
      </ScrollView>
      <NavigationBar currentScreen="RECIPEDISPLAY"/>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleVars.background,
  },
  titleHeader: {
    fontFamily: "SF Pro Display Heavy",
    textAlign: "center",
    alignSelf: "center",
    color: StyleVars.brandSecondaryColor,
    fontSize: 25,
    paddingBottom: "3%",
  },
  card: {
    borderRadius: 8,
    backgroundColor: StyleVars.cardBackground,
  },
  title: {
    fontFamily: "SF Pro Display Heavy",
    color: StyleVars.titleColor,
    fontSize: 35,
  },
  heading: {
    fontFamily: "SF Pro Display Heavy",
    fontSize: 20,
    color: StyleVars.headingColor,
  },
  goalItems: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0
  },
  dashboard: {
    padding: 20,
  },
  text: {
    fontFamily: "SF Pro Display Heavy",
    width: 350,
    height: 50,
    color: StyleVars.brandColor,
    fontSize: 28,
    textAlign: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  cardItem: {
    width: 330,
    backgroundColor: "#A9DAD6",
  },
  webView: {
    fontSize: 80,
    color: StyleVars.brandColor,
  },
});

export default RecipeDisplay;