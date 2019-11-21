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

      <Text style={styles.heading}>Profile</Text>


      <Content>
        <View styles={{flex:1, flexDirection: 'row'}}>
      <Text style={styles.text}>About</Text>
      <Text style={styles.text1}>Skill Level</Text>
        <Badge>
            <Text style={{color: "white"}}>Beginner</Text>
      </Badge>
      <Badge>
            <Text style={{color: "white"}}>Intermediate</Text>
      </Badge>

      <Badge>
            <Text style={{color: "white"}}>Advanced</Text>
      </Badge>

      <Badge>
            <Text style={{color: "white"}}>Professional</Text>
      </Badge>
      <Text style={styles.text3}>Dietary Restrictions</Text>
      </View>
      </Content >
        <Footer>
          <FooterTab>
            <Button>
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
    backgroundColor: "yellow",
    marginTop: "75%",
    marginLeft: "10%"
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


});

export default Profile;
