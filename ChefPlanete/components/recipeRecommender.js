import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { StyleProvider } from "native-base";

class RecipeRecommender extends Component {
  //Queries Edamam API for recipes based on user's food inventory
  //and returns a list of recipes that use specified ingredients
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[]
    };
  }

  async componentDidMount(){
    const api_keys= ['0bafdd91', '8c7be662dbc5c515d1d6518286169759'];
    fetch(`https://api.edamam.com/search?q=chicken&app_id=${api_keys[0]}&app_key=${api_keys[1]}`, {
      method: 'GET',
      headers: {},
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        loading: false,
        dataSource: responseJson
       })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    if(this.state.loading){
      return( 
        <View> 
          <Text style={styles.text}>Loading</Text>
        </View>
    );}
    return (
        <View>
          {/*<FlatList*/}
          {/*  data= {this.state.dataSource}*/}
          {/*  ItemSeparatorComponent = {this.FlatListItemSeparator}*/}
          {/*  renderItem= {item=> this.renderItem(item)}*/}
          {/*  keyExtractor= {item=>item.id.toString()}*/}
          {/*/>*/}
          <Text style={styles.text}>{this.state.dataSource}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    text: {
      color: "rgba(243,235,235,1)",
      position: "absolute",
      fontSize: 19,
      marginTop: "30%",
      marginLeft: "10%"
    },
    // horizontal: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-around',
    //   width: '60%'
    // },
    // button: {
    //     width: '40%',
    //     justifyContent: 'space-around'
    // }
});

export default RecipeRecommender;