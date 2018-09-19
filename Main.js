import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./Store.js";
import { AppRegistry, View } from "react-native";
import Routes from "./Routes.js";
import Header from "./Header";
import { Router, Scene } from "react-native-router-flux";
class reactTutorialApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
export default reactTutorialApp;

AppRegistry.registerComponent("reactTutorialApp", () => reactTutorialApp);
