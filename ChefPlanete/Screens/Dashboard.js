import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';

class Dashboard extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      // <Button
      //   title="Go to Jane's profile"
      //   onPress={() => navigate('Profile', {name: 'Jane'})}
      // />
      <Container style={styles.container}>
                 <View>
          <Text style={styles.text}>Good Morning, User!</Text>
           <Text style={styles.text2}>Today</Text>
           <Text style={styles.text2}>The Fridge</Text>
           <Text style={styles.text2}>Goals</Text>
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
    // return (
    //   <Container style={styles.container}>
         
    //     <Header />
    //     <View>
    //       <Text style={styles.text}>Good Morning, User!</Text>
    //        <Text style={styles.text2}>Today</Text>
    //        <Text style={styles.text2}>The Fridge</Text>
    //        <Text style={styles.text2}>Goals</Text>
    //     </View>
    //     <Content />
    //     <Footer>
    //       <FooterTab>
    //         <Button>
    //           <Icon name="apps" />
    //         </Button>
    //         <Button active>
    //           <Icon name="camera" />
    //         </Button>
    //         <Button>
    //           <Icon active name="navigate" />
    //         </Button>
    //         <Button active>
    //           <Icon name="person" />
    //         </Button>
    //       </FooterTab>
    //     </Footer>
        
    //   </Container>
     
    // );
  
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
      marginTop: 14,
      marginLeft: 26
    }

});

export default Dashboard;