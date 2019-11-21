import React, { useState } from 'react';
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

