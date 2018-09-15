import React, { Component, PropTypes } from "react";
import { Text, View } from "react-native";

import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#009688"
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 20
  }
});
export default class GreetingScreen extends React.Component {
  static propTypes = {
    showText: PropTypes.string,
    tag: PropTypes.string,
    tagId: PropTypes.string,
    onClick: PropTypes.func,
    width: PropTypes.number
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

GreetingScreen.propTypes = {
  name: React.PropTypes.string.isRequired
};
