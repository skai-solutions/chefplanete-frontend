import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Search() {
    return (
        <View style={styles.container}>
    
          <Text style={styles.heading}>Search</Text>
        
        </View>
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
      marginTop: "10%"
    },
  
  });
  
