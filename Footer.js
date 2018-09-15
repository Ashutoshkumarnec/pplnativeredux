import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
class Footer extends Component {
  render() {
    return (
      <View style={styles.flexcontainer}>
        <View style={styles.containerviews}>
          <Text>Copyright © Pet-Socail 2014 All Rights Reserved</Text>
        </View>
        <View style={styles.containerviews}>
          <Text>Home</Text>
        </View>
        <View style={styles.containerviews}>
          <Text>Login</Text>
        </View>
      </View>
    );
  }
}
export default Footer;
const styles = StyleSheet.create({
  flexcontainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#1e90ff",
    height: 80
  },
  containerviews: {
    backgroundColor: "#1e90ff",
    margin: 50,
    height: 20,
    marginTop: 20
  }
});
