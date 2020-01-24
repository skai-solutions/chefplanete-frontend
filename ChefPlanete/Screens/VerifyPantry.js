import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList,} from 'react-native';
import {bindActionCreators} from "redux";
import {scanReceipt} from "../actions/cameraActions";
import {getPantry,getIngredients, cameraIsLoading, getIngredientsErrors} from "../reducers";
import { connect } from "react-redux";
import {
    Button,
    CheckBox,
    Container,
    Content,
    Footer,
    FooterTab,
    Icon,
    List,
    ListItem,
    StyleProvider,

} from "native-base";

import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {mapDispatchToProps} from "./ReceiptScanned";
//
// export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit:scanReceipt}, dispatch);
const VerifyPantry = ({navigation, pantry}) => {
    const {navigate} = navigation;

    return (
        <Container style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>PLease verify: </Text>
                {
                    Object.entries(pantry).map(([key,value])=> <Text style={styles.text} key={key}>{value.name}</Text>)
                }
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(20,19,19,1)",
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
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
});

const mapStateToProps = state => ({
    pantry: getPantry(state),
    // ingredients: !state.camera.data ? null : getIngredients(state),
    // ingredientsLoading: cameraIsLoading(state),
    // errors: getIngredientsErrors(state),
});

// export default connect(mapStateToProps)(VerifyPantry);
//




export default connect(mapStateToProps, mapDispatchToProps)(VerifyPantry);


