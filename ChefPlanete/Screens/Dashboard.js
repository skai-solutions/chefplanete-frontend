import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, StyleProvider, CheckBox, List, ListItem } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

class Dashboard extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <StyleProvider style={getTheme(material)}>
      <Container style={styles.container}>
      <Content>

      <View>
          <Text style={styles.text}>Good Morning, User!</Text>

           <Text style={styles.text2}>Today</Text>
           <View style={styles.text5Row}>
            <Text style={styles.text5}>Breakfast</Text>
            <Text style={styles.text6}>Lunch</Text>
            <Text style={styles.text7}>Dinner</Text>
          </View>

           <Text style={styles.text2}>My Fridge</Text>

           
           <View>
              <Text style={styles.text3}>Goals</Text>
              
                <List>
                  <ListItem>
                  <CheckBox checked={false} />
                  <Text style={{color: "white"}}>Goal #1</Text>
                </ListItem>

                <ListItem>
                  <CheckBox checked={false} />
                  <Text style={{color: "white"}}>Goal #2</Text>
                </ListItem>
              </List>
              
           </View>

        
        </View>

        </Content >
        <Footer>
          <FooterTab>
            <Button active onPress={()=> navigate('MyFridge')}>
              <Icon name="nutrition" />
            </Button>
            <Button active>
              <Icon name="camera" />
            </Button>
            <Button active onPress={()=> navigate('Search')}>
              <Icon name="search" />
            </Button>
            <Button active onPress={()=> navigate('Profile')}>
              <Icon name="person"  />
            </Button>
          </FooterTab>
        </Footer>
        
      </Container>
      </StyleProvider>
    );
  }
   
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(20,19,19,1)",
    },
    text: {
      width: 375,
      height: 50,
      color: "rgba(94,167,11,1)",
      fontSize: 32,
      textAlign: "center",
      marginTop: 62,
      alignSelf: "center"
    },
    text2: {
      color: "rgba(255,255,255,1)",
      fontSize: 24,
      marginBottom: "25%",
      marginLeft: "10%"
    },
    text3: {
      color: "rgba(255,255,255,1)",
      fontSize: 24,
      // marginBottom: "10%",
      marginLeft: "10%"
    },
    text5: {
      color: "rgba(255,255,255,1)",
      fontSize: 14,
    },
    text6: {
      color: "rgba(255,255,255,1)",
      fontSize: 14,
      marginLeft: 50
    },
    text7: {
      color: "rgba(255,255,255,1)",
      fontSize: 14,
      marginLeft: 59
    },
    text5Row: {
      height: 14,
      flexDirection: "row",
      marginTop: 10,
      marginLeft: "20%",
      marginBottom: 40
    }

});

export default Dashboard;