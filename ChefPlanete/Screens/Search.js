import React, { Component }  from 'react';
import { Badge, StyleSheet, Text, View } from "react-native";
import { Button, Container, Content, Footer, FooterTab, Header, Icon, Input, Item, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

class Search extends Component {
  static navigationOptions = {
    title: 'Search',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={styles.container}>
          <View style={styles.moveDown}>
            <Header searchBar rounded style={styles.searchBar}>
              <Item>
                <Icon name="search"/>
                <Input placeholder="Search" />
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Header>
          </View>
          {/* <View style={styles.main}>
            <View style={styles.recommendRectangle}>
            </View>
          </View> */}

          <Content />

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
    heading: {
      color: "rgba(236,243,229,1)",
      position: "absolute",
      fontSize: 45,
      lineHeight: 0,
      textAlign: "center",
      marginTop: "10%"
    },
    searchBar: {
      justifyContent: "flex-start"
    },
    moveDown: {
      marginTop: "10%"
    },
    recommendRectangle: {
      width: 50, 
      height: 50, 
      backgroundColor: 'rgba(94,167,11,1)',
      alignItems: "stretch",
      // justifyContent: "space-around"
    },
    main: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: "space-around"
    }
  });
  
  export default Search;