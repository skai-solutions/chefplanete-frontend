import React, { Component }  from 'react';
import { StyleSheet, View, Text, Badge } from "react-native";
import { Button, Container, Content, Footer, FooterTab, Header, Icon } from 'native-base';

class CameraLoading extends Component{
    static navigationOptions = {
        title: 'CameraLoading',
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Processing Photo...</Text>
                </View>

                <Content />

                <Footer>
                    <FooterTab>
                        <Button>
                            <Icon name="nutrition" />
                        </Button>
                        <Button active onPress={()=> navigate('OCRCamera')}>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(20,19,19,1)"
    },
    heading: {
        color: 'white',
        position: "absolute",
        fontSize: 30,
        lineHeight: 0,
        textAlign: "left",
        marginTop: "70%",
        marginLeft: "10%"
    },
});

export default CameraLoading;

