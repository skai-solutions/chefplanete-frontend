import React from 'react';
import { Button, Container } from "native-base";
import { StyleSheet, Text, View } from 'react-native';
import { getPantry } from "../reducers";
import { connect } from "react-redux";

// export const mapDispatchToProps = dispatch => bindActionCreators({onSubmit:scanReceipt}, dispatch);

// export const mapStateToProps = state => ({
//   ingredients: !state.camera.data ? null : getIngredients(state),
//   ingredientsLoading: cameraIsLoading(state),
//   errors: getIngredientsErrors(state),
// });

const VerifyIdentifiedIngredients = ({navigation, pantry}) => {
  const {navigate} = navigation;
  return (
    <Container style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>We have identified the following items:</Text>
        </View>
        <View style={styles.list}>
          {
            Object.entries(pantry).map(([key,value])=> <Text style={styles.text} key={key}>{value.name}</Text>)
          }
        </View>
        <View style={styles.footer}>
          <Button title="Approve"/>
        </View>
        {/* <Text style={styles.text}>PLease verify: </Text> */}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(20,19,19,1)",
    },
    header: {
        flex: 2,
        backgroundColor: "rgba(20,19,19,1)",
    },
    list: {
        flex: 3,
        backgroundColor: "rgba(20,19,19,1)",
    },
    listrow: {
      flexDirection: 'row',

    },
    footer: {
        flex: 1,
        backgroundColor: "rgba(20,19,19,1)",
    },
    heading: {
      color: "rgba(94,167,11,1)",
      fontSize: 45,
      textAlign: "center",
      marginTop: "10%",
    },
    text: {
        //width: 375,
        //height: 50,
        color: "rgba(94,167,11,1)",
        fontSize: 32,
        textAlign: "center",
        marginTop: 62,
        alignSelf: "center"
    },
});

const mapStateToProps = state => ({
    pantry: getPantry(state),
});

export default connect(mapStateToProps)(VerifyIdentifiedIngredients);
