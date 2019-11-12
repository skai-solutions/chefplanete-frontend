import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import MaterialButtonWithVioletText from "../components/MaterialButtonWithVioletText";
import MaterialButtonWithVioletText1 from "../components/MaterialButtonWithVioletText1";
import CupertinoFooter1 from "../components/CupertinoFooter1";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Good Morning, User!</Text>
      <Text style={styles.text2}>Today</Text>
      <View style={styles.ellipseRow}>
        <Svg viewBox="0 0 69.84 71.84" style={styles.ellipse}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(230, 230, 230,1)"
            stroke="rgba(230, 230, 230,1)"
            cx={35}
            cy={36}
            rx={34}
            ry={35}
          />
        </Svg>
        <Svg viewBox="0 0 69.84 71.84" style={styles.ellipse2}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(230, 230, 230,1)"
            stroke="rgba(230, 230, 230,1)"
            cx={35}
            cy={36}
            rx={34}
            ry={35}
          />
        </Svg>
        <Svg viewBox="0 0 69.84 71.84" style={styles.ellipse3}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(230, 230, 230,1)"
            stroke="rgba(230, 230, 230,1)"
            cx={35}
            cy={36}
            rx={34}
            ry={35}
          />
        </Svg>
      </View>
      <View style={styles.text5Row}>
        <Text style={styles.text5}>Breakfast</Text>
        <Text style={styles.text7}>Lunch</Text>
        <Text style={styles.text6}>Dinner</Text>
      </View>
      <Text style={styles.text3}>My Fridge</Text>
      <View style={styles.rect}>
        <View style={styles.text8Row}>
          <Text style={styles.text8}>Eggs</Text>
          <Text style={styles.text12}>1 doz.</Text>
        </View>
      </View>
      <View style={styles.rect4}>
        <View style={styles.text16Row}>
          <Text style={styles.text16}>Chicken</Text>
          <Text style={styles.text13}>4 pcs.</Text>
        </View>
      </View>
      <View style={styles.rect3}>
        <View style={styles.text15Row}>
          <Text style={styles.text15}>Milk</Text>
          <Text style={styles.text14}>1 L</Text>
        </View>
      </View>
      <MaterialButtonWithVioletText
        style={styles.materialButtonWithVioletText}
      />
      <Text style={styles.text4}>Goals</Text>
      <View style={styles.ellipse4Row}>
        <Svg viewBox="0 0 16.66 18.00" style={styles.ellipse4}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(230, 230, 230,1)"
            stroke="rgba(230, 230, 230,1)"
            cx={8}
            cy={9}
            rx={8}
            ry={9}
          />
        </Svg>
        <Text style={styles.text9}>Dine out maximum 2 times this week</Text>
      </View>
      <View style={styles.ellipse6Row}>
        <Svg viewBox="0 0 16.66 18.00" style={styles.ellipse6}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(230, 230, 230,1)"
            stroke="rgba(230, 230, 230,1)"
            cx={8}
            cy={9}
            rx={8}
            ry={9}
          />
        </Svg>
        <Text style={styles.text10}>Learn 1 new recipe</Text>
      </View>
      <View style={styles.ellipse5Row}>
        <Svg viewBox="0 0 16.66 18.00" style={styles.ellipse5}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(230, 230, 230,1)"
            stroke="rgba(230, 230, 230,1)"
            cx={8}
            cy={9}
            rx={8}
            ry={9}
          />
        </Svg>
        <Text style={styles.text11}>Other stuff I guess</Text>
      </View>
      <MaterialButtonWithVioletText1
        style={styles.materialButtonWithVioletText1}
      />
      <CupertinoFooter1 style={styles.cupertinoFooter1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(20,19,19,1)"
  },
  text: {
    width: 375,
    height: 50,
    color: "rgba(94,167,11,1)",
    fontSize: 32,
    fontFamily: "amiko-regular",
    textAlign: "center",
    marginTop: 62,
    alignSelf: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    fontFamily: "amiko-regular",
    marginTop: 14,
    marginLeft: 26
  },
  ellipse: {
    width: 70,
    height: 72
  },
  ellipse2: {
    width: 70,
    height: 72,
    marginLeft: 39
  },
  ellipse3: {
    width: 70,
    height: 72,
    marginLeft: 34
  },
  ellipseRow: {
    height: 72,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 46,
    marginRight: 46
  },
  text5: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    fontFamily: "amiko-regular"
  },
  text7: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    fontFamily: "amiko-regular",
    marginLeft: 50
  },
  text6: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    fontFamily: "amiko-regular",
    marginLeft: 59
  },
  text5Row: {
    height: 14,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 53,
    marginRight: 57
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    fontFamily: "amiko-regular",
    marginTop: 16,
    marginLeft: 26
  },
  rect: {
    width: 316,
    height: 35,
    backgroundColor: "rgba(230, 230, 230,1)",
    flexDirection: "row",
    marginTop: 23,
    marginLeft: 26
  },
  text8: {
    color: "rgba(20,19,19,1)",
    fontSize: 14,
    fontFamily: "amiko-700"
  },
  text12: {
    color: "rgba(94,167,11,1)",
    fontSize: 14,
    fontFamily: "amiko-700",
    marginLeft: 229
  },
  text8Row: {
    height: 14,
    flexDirection: "row",
    flex: 1,
    marginRight: 3,
    marginLeft: 10,
    marginTop: 11
  },
  rect4: {
    width: 316,
    height: 35,
    backgroundColor: "rgba(230, 230, 230,1)",
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 26
  },
  text16: {
    color: "rgba(20,19,19,1)",
    fontSize: 14,
    fontFamily: "amiko-700"
  },
  text13: {
    color: "rgba(94,167,11,1)",
    fontSize: 14,
    fontFamily: "amiko-700",
    marginLeft: 210
  },
  text16Row: {
    height: 14,
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    marginTop: 10
  },
  rect3: {
    width: 316,
    height: 35,
    backgroundColor: "rgba(230, 230, 230,1)",
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 26
  },
  text15: {
    color: "rgba(20,19,19,1)",
    fontSize: 14,
    fontFamily: "amiko-700"
  },
  text14: {
    color: "rgba(94,167,11,1)",
    fontSize: 14,
    fontFamily: "amiko-700",
    marginLeft: 246
  },
  text15Row: {
    height: 14,
    flexDirection: "row",
    flex: 1,
    marginRight: 9,
    marginLeft: 10,
    marginTop: 11
  },
  materialButtonWithVioletText: {
    width: 133,
    height: 36,
    marginTop: 3,
    marginLeft: 242
  },
  text4: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    fontFamily: "amiko-regular",
    marginLeft: 26
  },
  ellipse4: {
    width: 17,
    height: 18
  },
  text9: {
    color: "rgba(94,167,11,1)",
    fontSize: 14,
    fontFamily: "amiko-regular",
    marginLeft: 9,
    marginTop: 4
  },
  ellipse4Row: {
    height: 18,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 36,
    marginRight: 56
  },
  ellipse6: {
    width: 17,
    height: 18
  },
  text10: {
    color: "rgba(94,167,11,1)",
    fontSize: 14,
    fontFamily: "amiko-regular",
    marginLeft: 9,
    marginTop: 4
  },
  ellipse6Row: {
    height: 18,
    flexDirection: "row",
    marginTop: 19,
    marginLeft: 36,
    marginRight: 181
  },
  ellipse5: {
    width: 17,
    height: 18
  },
  text11: {
    color: "rgba(94,167,11,1)",
    fontSize: 14,
    fontFamily: "amiko-regular",
    marginLeft: 9,
    marginTop: 4
  },
  ellipse5Row: {
    height: 18,
    flexDirection: "row",
    marginTop: 23,
    marginLeft: 36,
    marginRight: 184
  },
  materialButtonWithVioletText1: {
    width: 100,
    height: 36,
    marginTop: 19,
    marginLeft: 259
  },
  cupertinoFooter1: {
    width: 375,
    height: 49,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 12,
    alignSelf: "center"
  }
});

export default Dashboard;
