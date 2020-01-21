import React, { Component } from 'react';
import { StyleSheet, View, Text, Badge, ScrollView, Image, FlatList } from "react-native";
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import NavigationBar from '../components/NavigationBar';

const MyFridge = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <Container style={styles.container}>
      <View>
        <Text style={styles.heading}>MyFridge</Text>
        <FlatList
          data={[
            { key: 'Devin' },
            { key: 'Dan' },
            { key: 'Dominic' },
            { key: 'Jackson' },
            { key: 'James' },
            { key: 'Joel' },
            { key: 'John' },
            { key: 'Jillian' },
            { key: 'Jimmy' },
            { key: 'Julie' },
            ]}
          renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
      <Content />
      <NavigationBar/>
    </Container>
  );
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
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: "rgba(236,243,229,1)",
    }
});

export default MyFridge;