import React, { Component } from "react";
import { View, Text, StyleSheet, Image, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
class Footer extends Component {
  state = {
    LoggedIn: ""
  };
  logout = async () => {
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("Username");
    this.setState({ LoggedIn: "" });
    let emails = await AsyncStorage.getItem("email");
    if (emails === null) {
      Actions.pop({ key: Actions.login() });
      Actions.refresh({ key: Actions.login() });
    } else {
      console.warn("Error");
    }
  };
  Home = () => {
    Actions.home();
  };
  componentDidMount = async () => {
    let emails = await AsyncStorage.getItem("email");
    if (emails !== null) {
      this.setState({ LoggedIn: emails });
    } else {
      this.setState({ LoggedIn: "" });
    }
  };
  render() {
    return (
      <View style={styles.flexcontainer}>
        <View>
          <Image source={require("./images/logo.png")} />
        </View>
        <View style={styles.containerview}>
          <Text onPress={this.Home}>Home</Text>
        </View>
        <View style={styles.containerview}>
          <Text>
            {this.state.LoggedIn ? (
              <Text onPress={this.logout}>Logout</Text>
            ) : (
              "Me"
            )}
          </Text>
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
  containerview: {
    backgroundColor: "#1e90ff",
    margin: 30,
    height: 30,
    marginTop: 20
  }
});
