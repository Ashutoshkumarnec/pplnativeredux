import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
class FlexBox extends Component {
  render() {
    return (
      <View style={styles.FlexContainer}>
        <Text style={{ width: 50, height: 50, backgroundColor: "powderblue" }}>
          Hlw
        </Text>
        <Text style={{ width: 50, height: 50, backgroundColor: "skyblue" }}>
          Hlw
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  FlexItem: {
    color: "white",
    padding: 10
  },
  FlexContainer: {
    flex: 2,
    flexDirection: "row"
  }
});
export default FlexBox;
