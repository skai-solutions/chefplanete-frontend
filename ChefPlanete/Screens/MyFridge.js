import React, { Component }  from 'react';
import { StyleSheet, View, Text, Badge } from "react-native";
import { Button, Container, Content, Footer, FooterTab, Header, Icon } from 'native-base';


class MyFridge extends Component {
  static navigationOptions = {
    title: 'MyFridge',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.heading}>MyFridge</Text>
        </View>
      
        <Content />
        
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="nutrition" />
            </Button>
            <Button active onPress={()=> navigate('OCRCamera')}>
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
  });
  
  export default MyFridge;