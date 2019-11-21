import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
    <Container style={styles.container}>

      <View>
          <Text style={styles.heading}>Profile</Text>
          <Text style={styles.text} >About</Text>
      </View>

      <Content> 
      <Text> Firstname Lastname </Text>
      <Text>Age</Text>
      <Text>Email</Text>
      
      <Text style={styles.text1}>Skill Level</Text>

      <View style={styles.badge1}>
        <Badge style={{backgroundColor: "yellow"}}>
            <Text style={{color: "black"}}>Beginner</Text>
        </Badge>

        <Badge style={{backgroundColor: "orange"}}>
            <Text style={{color: "black"}}>Intermediate</Text>
        </Badge>

        <Badge style={{backgroundColor: "pink"}}>
            <Text style={{color: "black"}}>Advanced</Text>
        </Badge>

        <Badge style={{backgroundColor: "red"}}>
            <Text style={{color: "black"}}>Professional</Text>
        </Badge>
      </View>

      <Text style={styles.text3}>Dietary Restrictions</Text>
      <Text style={styles.text4}>Vegan</Text>

      <Text style={styles.text4}>Allergies</Text>

      
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
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(20,19,19,1)"
  },
  heading: {
    color: "rgba(236,243,229,1)",
    position: "absolute",
    fontSize: 45,
    lineHeight: 0,
    textAlign: "center",
    marginTop: "10%",
    marginLeft: "30%"
  },
  text: {
    color: "rgba(243,235,235,1)",
    position: "absolute",
    fontSize: 19,
    marginTop: "30%",
    marginLeft: "10%"
  },
  text1: {
    color: "rgba(243,235,235,1)",
    position: "absolute",
    fontSize: 19,
    marginTop: "65%",
    marginLeft: "10%"
  },
  text2: {
    color: "rgba(243,235,235,1)",
    position: "absolute",
    fontSize: 19,
    marginTop: "100%",
    marginLeft: "10%"
  },
  text3: {
    color: "rgba(243,235,235,1)",
    position: "absolute",
    fontSize: 19,
    marginTop: "120%",
    marginLeft: "10%"
  },

  badge1: {
    marginTop: "75%",
    flexDirection: "row",
    padding: 30
  },

  badgeText: {
    color: "white",
  },
  badge2: {
    backgroundColor: "orange",
    marginTop: "75%",
    marginLeft: "20%"
  },
  badge3: {
    backgroundColor: "pink",
    marginTop: "75%",
    marginLeft: "40%"
  },
  badge4: {
    backgroundColor: "red",
    marginTop: "75%",
    marginLeft: "60%"
  },
  text4: {
    marginTop: "110%"
  }


});

export default Profile;
