import React, { useState } from 'react';
import {Header, Item} from 'native-base';
import { Text, View, Button, StyleSheet, Clipboard } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from "expo-file-system";
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

class OCRCamera extends React.Component {
    static navigationOptions = {
        title: 'OCRCamera',
    };
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if(status == "granted"){
            this.setState({ hasCameraPermission: status === 'granted' })
        }else {
            throw new Error('Camera permission not granted');
        }

    }

    async snapPhoto() {
        // console.log(this.camera);
        if(this.camera) {
            console.log("button pressed");
            const options = {
                quality: 0,
                base64: true,
                base64Encoded: true,
                fixOrientation: true,
                exif: true
            };
           await this.camera.takePictureAsync(options).then((data) =>
            {
                Clipboard.setString(data.base64);
                //console.log(data.base64);
                this.setState({path: data.uri});
                navigate()


            });
           // console.log(photo.base64Encoded);
        }
    }
    // onPictureSaved = async photo => {
    //     await FileSystem.moveAsync({
    //         from: photo.uri,
    //         to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
    //     });
    //     this.setState({ newPhotos: true });
    // }

    render() {
        const { hasCameraPermission } = this.state;
        const {navigate} = this.props.navigation;

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
                        style={styles.CameraContainer}
                        type={this.state.type}
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


                            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
                                <Icon reverse={ true } name="md-flash" type='ionicon' style={{ color: 'black', fontWeight: 'bold' }} />
                                <Icon
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ?
                                                Camera.Constants.Type.front :
                                                Camera.Constants.Type.back
                                        })
                                    }}
                                    name="md-reverse-camera"
                                    reverse={true}
                                    type='ionicon'
                                    style={{ color: 'black', fontWeight: 'bold' }}
                                />
                            </View>
                        </Header>
                        <View style = {styles.bottom}>
                            <Icon
                                onPress = {this.snapPhoto.bind(this)}
                                onPressOut={() => navigate('CameraLoading')}


                                name = 'camera'
                                reverse={true}
                                style={{ color: 'white', fontWeight: 'bold' }} />

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
    },
    CameraContainer:{
        flex: 1,
        justifyContent: 'space-between',
        width: "100%",
    }
})

