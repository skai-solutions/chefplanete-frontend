import React, {useState, useEffect} from 'react';
import {Header, Item} from 'native-base';
import {Text, View, Button, StyleSheet, Clipboard} from 'react-native';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {Icon} from 'react-native-elements';
import {scanReceipt} from "../actions/cameraActions";
import {bindActionCreators} from "redux";
import {signInUser} from "../actions/userActions";
import {
  cameraIsLoading,
  getIngredientsErrors,
} from "../reducers";
import connect from "react-redux/lib/connect/connect";

export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit: scanReceipt}, dispatch);

export const mapStateToProps = state => ({
  cameraIsLoading: cameraIsLoading(state),
  errors: getIngredientsErrors(state),
});

const OCRCamera = ({navigation, onSubmit, cameraIsLoading, errors}) => {

  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const {navigate} = navigation;

  useEffect( () => {
    Permissions.askAsync(Permissions.CAMERA).then(({status}) => {
      if (status === "granted") {
        setCameraPermission(true);
      } else {
        throw new Error('Camera permission not granted');
      }
    });
  });

  const snapPhoto = async () => {
    if (this.camera) {
      console.log("button pressed");
      const options = {
        quality: 0.8,
        base64: true,
        fixOrientation: true,
      };
      await this.camera.takePictureAsync(options).then(async (data) => {
        const base64image = data.base64.replace(/(?:\r\n|\r|\n)/g, '');
        onSubmit(base64image).catch(() => console.log("camera error"));
        navigation.replace('CameraResults');
      });
    }
  };

  if (hasCameraPermission === null) {
    return <View/>
  } else if (hasCameraPermission === false) {
    return <Text> No access to camera</Text>
  } else {
    return (
      <View style={{flex: 1}}>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.CameraContainer}
          type={type}
          ratio="20:9" //FOR DEMO ON ANDROID
        >
          <Header
            searchBar
            rounded
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              left: 0,
              top: 0,
              right: 0,
              zIndex: 100,
              alignItems: 'center'
            }}
          >


            <View style={{flexDirection: 'row', flex: 2, justifyContent: 'space-around'}}>
              <Icon reverse={true} name="md-flash" type='ionicon' style={{color: 'black', fontWeight: 'bold'}}/>
              <Icon
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back ?
                      Camera.Constants.Type.front :
                      Camera.Constants.Type.back
                  );
                }}
                name="md-reverse-camera"
                reverse={true}
                type='ionicon'
                style={{color: 'black', fontWeight: 'bold'}}
              />
            </View>
          </Header>
          <View style={styles.bottom}>
            <Icon
              onPress={snapPhoto}
              name='camera'
              reverse={true}
              style={{color: 'white', fontWeight: 'bold'}}/>
          </View>
        </Camera>
      </View>
    )
  }
};
const styles = StyleSheet.create({
  bottom: {
    flex: 2,
    justifyContent: 'flex-end',
    marginBottom: 36,
    alignSelf: 'center'
  },
  CameraContainer: {
    flex: 1,
    justifyContent: 'space-between',
    width: "100%",
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OCRCamera);



