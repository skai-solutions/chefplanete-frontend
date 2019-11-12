import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import OCRCamera from "./components/OCRCamera"


export default function App() {
  return (
    <View style={styles.container}>
      <OCRCamera></OCRCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: '#fff',
    width: 400,
    alignSelf: 'center',


  },
});
