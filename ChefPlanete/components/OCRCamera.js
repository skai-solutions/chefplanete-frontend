import React, { useState } from 'react';
<<<<<<< HEAD
import {Header, Item, Icon} from 'native-base'
import { Text, View, Button, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';


class OCRCamera extends React.Component {

    // cameraRef = this.Camera;

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    async snapPhoto() {
        // console.log(this.camera);
        if(this.camera) {
            console.log("button pressed");
            const options = {
                quality: 0,
                base64: true,
                fixOrientation: true,
                exif: true
            };

            await this.camera.takePictureAsync(options).then(photo => {
                console.log(photo.base64);
                this.setState({path: photo.uri});

            });
        }
    }

    render() {
        const { hasCameraPermission } = this.state

        if (hasCameraPermission === null) {
            return <View />
        }
        else if (hasCameraPermission === false) {
            return <Text> No access to camera</Text>
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1, justifyContent: 'space-between' }}
                        type={this.state.type}
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


                            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
                                <Icon name="ios-flash" style={{ color: 'white', fontWeight: 'bold' }} />
                                <Icon
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ?
                                                Camera.Constants.Type.front :
                                                Camera.Constants.Type.back
                                        })
                                    }}
                                    name="ios-reverse-camera"
                                    style={{ color: 'white', fontWeight: 'bold' }}
                                />
                            </View>
                        </Header>
                        <View style = {styles.bottom}>
                            <Icon
                                onPress = {this.snapPhoto.bind(this)}

                                name = 'ios-camera' style={{ color: 'white', fontWeight: 'bold' }} />

                        </View>
                    </Camera>
                </View>
            )
        }
    }
=======
import { Text, View, TouchableOpacity, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const OCRCamera = props => {
  const [cameraPermission, setCameraPermission] = useState(null);

  const componentDidMount = async() => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setCameraPermission(() => {
      return status === 'granted';
    });
  }

  // if (cameraPermission === null) {
  //   return <View />;
  // } else if (cameraPermission === false) {
  //   return <Text>No access to camera</Text>;
  // } else {
  return (
    <View style={{ flex: 1 }}>
      <Button title="Set camera permission" onPress={componentDidMount}/>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({
                type:
                  this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
              });
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
  // }
>>>>>>> 1968a0fdddcf43ddfb723601a499636f06a9f531
}

export default OCRCamera;

const styles = StyleSheet.create({
    bottom:{
        flex: 2,
        justifyContent: 'flex-end',
        marginBottom: 36,
        alignSelf: 'center'
    }
})

