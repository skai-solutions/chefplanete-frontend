import React, { Component }  from 'react';
import { StyleSheet, View, Text, Badge } from "react-native";
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';


class Search extends React.Component {
    static navigationOptions = {
      title: 'Search',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <Container style={styles.container}>
      <View style={styles.container}>
      <Text style={styles.heading}>Search</Text>
      </View>
          <Content />
          <Footer>
            <FooterTab>
              <Button>
                <Icon name="apps" />
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
      marginTop: "10%"
    },
  
  });
  
  export default Search;
