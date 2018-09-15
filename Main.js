import React, { Component } from "react";
import { AppRegistry, View } from "react-native";
import Routes from "./Routes.js";
import Header from "./Header";
import { Router, Scene } from "react-native-router-flux";
class reactTutorialApp extends Component {
  render() {
    return <Routes />;
  }
}
export default reactTutorialApp;

AppRegistry.registerComponent("reactTutorialApp", () => reactTutorialApp);
