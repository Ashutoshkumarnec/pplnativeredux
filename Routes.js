import React, { Component } from "react";
import { Router, Scene, Tabs } from "react-native-router-flux";
import Register from "./Register.js";
import { Route, Redirect, Switch } from "react-router";
import Login from "./Login.js";
import TimeLine from "./TimeLine";
import Forget from "./Forget";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import { View } from "react-native";
import { Container } from "native-base";

import Stack from "react-router-native-stack";
import { Card, Navigation } from "react-router-navigation";
class Routes extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Scene key="root">
            <Scene
              key="register"
              component={Register}
              hideNavBar={true}
              title="Register"
              initial={true}
            />
            <Scene
              key="login"
              component={Login}
              title="Login"
              hideNavBar={true}
            />
            <Scene
              key="forget"
              component={Forget}
              title="Forget"
              hideNavBar={true}
            />
            <Scene key="timeline" component={TimeLine} hideNavBar={true} />
            <Scene key="home" component={Home} title="Home" hideNavBar={true} />
          </Scene>
        </Router>
        <Footer />
      </Container>
    );
  }
}
export default Routes;
