import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import Store from "./Store";
import Footer from "./Footer";
import { Actions } from "react-native-router-flux";
import {
  AppRegistry,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  AsyncStorage,
  Button,
  ActivityIndicator,
  Modal
} from "react-native";
// import { Header } from "react-native-elements";
class Login extends Component {
  // state = {
  //   password: "",
  //   email: "",
  //   passwordmsg: "",
  //   emailmsg: "",
  //   LoginCnf: "",
  //   Error: false,
  //   Cliecked: false
  // };
  HandleInput = fieldName => text => {
    if (fieldName === "email") {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === true) {
        // this.setState({ emailmsg: "Valid Email ", email: text });
        Store.dispatch({
          type: "Login_username",
          fieldName: "emailmsg",
          value: "Valid Email"
        });
        Store.dispatch({
          type: "Login_username",
          fieldName: "email",
          value: text
        });
      } else {
        // this.setState({ emailmsg: "InValid Email ", email: "" });
        Store.dispatch({
          type: "Login_username",
          fieldName: "emailmsg",
          value: "InValid Email"
        });
        Store.dispatch({
          type: "Login_username",
          fieldName: "email",
          value: ""
        });
      }
    } else {
      // this.setState({ [fieldName]: text });
      Store.dispatch({
        type: "Login_username",
        fieldName: fieldName,
        value: text
      });
    }
  };
  Login = async () => {
    if (this.props.Data.email === "") {
      // this.setState({
      //   emailmsg: "Please , Enter Email",
      //   LoginCnf: ""
      // });
      Store.dispatch({
        type: "Login_username",
        fieldName: "emailmsg",
        value: "Please , Enter Email"
      });
      Store.dispatch({
        type: "Login_username",
        fieldName: "LoginCnf",
        value: ""
      });
    } else if (this.props.Data.password === "") {
      // this.setState({
      //   passwordmsg: "Please , Enter Password",
      //   emailmsg: "",
      //   LoginCnf: ""
      // });
      Store.dispatch({
        type: "Login_username",
        fieldName: "passwordmsg",
        value: "Please , Enter Password"
      });
      Store.dispatch({
        type: "Login_username",
        fieldName: "emailmsg",
        value: ""
      });
      Store.dispatch({
        type: "Login_username",
        fieldName: "LoginCnf",
        value: ""
      });
    } else {
      // this.setState({ passwordmsg: "", emailmsg: "", Cliecked: true });
      Store.dispatch({
        type: "Login_username",
        fieldName: "passwordmsg",
        value: ""
      });
      Store.dispatch({
        type: "Login_username",
        fieldName: "emailmsg",
        value: ""
      });
      Store.dispatch({
        type: "Login_username",
        fieldName: "Cliecked",
        value: true
      });
      try {
        await fetch("http://192.168.100.194:7187/login", {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(this.props.Data)
        })
          .then(response => {
            return response.json();
          })
          .then(resp => {
            if (resp.data === "Incorrect Password or Email not Verified") {
              // this.setState({ LoginCnf: resp.data, Cliecked: false });
              Store.dispatch({
                type: "Login_username",
                fieldName: "LoginCnf",
                value: resp.data
              });
              Store.dispatch({
                type: "Login_username",
                fieldName: "Cliecked",
                value: false
              });
            } else if (resp.data === "User Not Registered") {
              // this.setState({ LoginCnf: resp.data, Cliecked: false });
              Store.dispatch({
                type: "Login_username",
                fieldName: "LoginCnf",
                value: resp.data
              });
              Store.dispatch({
                type: "Login_username",
                fieldName: "Cliecked",
                value: false
              });
            } else {
              this.storeData(resp.data);
              Actions.pop({ key: Actions.timeline() });
              Actions.refresh({ key: Actions.timeline() });
              Store.dispatch({
                type: "Login_username",
                fieldName: "Cliecked",
                value: false
              });
            }
          });
      } catch (error) {
        setTimeout(() => {
          // this.setState({ Error: true });
          Store.dispatch({
            type: "Login_username",
            fieldName: "Error",
            value: true
          });
        }, 7000);
      }
    }
  };
  Toggle = () => {
    // this.setState({ Error: false, Cliecked: false });
    Store.dispatch({
      type: "Login_username",
      fieldName: "Error",
      value: false
    });
    Store.dispatch({
      type: "Login_username",
      fieldName: "Cliecked",
      value: false
    });
  };
  storeData = async firstname => {
    try {
      await AsyncStorage.setItem("email", this.props.Data.email);
      await AsyncStorage.setItem("Username", firstname);
    } catch (error) {
      alert(error);
    }
  };
  Register = () => {
    Actions.pop({ key: Actions.register() });
    Actions.refresh({ key: Actions.register() });
  };
  Forget = () => {
    Actions.pop({ key: Actions.forget() });
    Actions.refresh({ key: Actions.forget() });
  };
  render() {
    return (
      <View>
        <Header />
        <ImageBackground
          source={require("./images/img_9.png")}
          style={styles.backgroundImage}
        >
          <ScrollView>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              blurOnSubmit={false}
              placeholderTextColor="black"
              autoCapitalize="none"
              returnKeyType={"next"}
              onChangeText={this.HandleInput("email")}
            />
            <Text style={{ marginLeft: 10, color: "red" }}>
              {this.props.Data.emailmsg}
            </Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="black"
              autoCapitalize="none"
              onChangeText={this.HandleInput("password")}
            />
            <Text style={{ marginLeft: 10, color: "red" }}>
              {this.props.Data.passwordmsg}
            </Text>
            {this.props.Data.Error === true ? (
              <View
                style={{
                  display: "flex",
                  position: "absolute",
                  width: 310,
                  height: 200,
                  backgroundColor: "white",
                  opacity: 0.9,
                  margin: "auto",

                  zIndex: 1,
                  marginTop: 60,
                  marginLeft: 40,
                  borderRadius: 10,
                  borderColor: "orange",
                  borderWidth: 1
                }}
                onPress={this.Close}
              >
                <Text
                  style={{ fontSize: 25, marginLeft: 270 }}
                  onPress={this.Toggle}
                >
                  ❌
                </Text>
                <Text style={{ color: "red", fontSize: 20, width: 300 }}>
                  Connection timeout, Check connection with backend Server
                </Text>
              </View>
            ) : this.props.Data.Cliecked === true ? (
              <View
                style={{
                  display: "flex",
                  position: "absolute",
                  width: 310,
                  height: 200,
                  backgroundColor: "white",
                  opacity: 0.9,
                  margin: "auto",
                  justifyContent: "center",
                  zIndex: 1,
                  marginTop: 60,
                  marginLeft: 40,
                  borderRadius: 10,
                  borderColor: "orange",
                  borderWidth: 1
                }}
                onPress={this.Close}
              >
                <Text style={{ color: "green", fontSize: 20 }}>
                  Processing your request , Please wait ....
                </Text>
                <ActivityIndicator size="large" color="green" />
              </View>
            ) : (
              <Text style={{ marginLeft: 10, color: "red" }}>
                {this.props.Data.LoginCnf}
              </Text>
            )}
            <View
              style={{
                display: "flex",
                margin: 10,
                flexDirection: "column",
                width: 180,
                marginLeft: 60
              }}
            >
              <View
                style={{
                  margin: 10,
                  marginLeft: 50,

                  backgroundColor: "orange"
                }}
              >
                {/*<TouchableOpacity onPress={this.Login}>
                  <Text
                    style={{
                      color: "#3b2f31",
                      fontSize: 25,
                      textAlign: "center"
                    }}
                  >
                    Login
                  </Text>
                  </TouchableOpacity>*/}

                <Button full rounded dark onPress={this.Login} title="Login" />
              </View>
              <View>
                <Text style={{ fontSize: 20, color: "black" }}>
                  I already have an account.Click on{" "}
                  <Text style={{ color: "red" }}>"Register"</Text>
                </Text>
              </View>

              <View
                style={{
                  marginLeft: 12,
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    margin: 10,
                    marginLeft: 50,
                    backgroundColor: "orange",
                    width: 120,
                    height: 35
                  }}
                >
                  {/*<TouchableOpacity onPress={this.Register}>
                    <Text
                      style={{
                        color: "#3b2f31",
                        fontSize: 25,
                        textAlign: "center"
                      }}
                    >
                      Register
                    </Text>
                    </TouchableOpacity>*/}
                  <Button
                    full
                    rounded
                    dark
                    onPress={this.Register}
                    title="Register"
                  />
                </View>
                <View
                  style={{
                    margin: 10,
                    marginLeft: 20,
                    backgroundColor: "orange",
                    width: 100
                  }}
                >
                  {/*<TouchableOpacity onPress={this.Forget}>
                    <Text
                      style={{
                        color: "#3b2f31",
                        fontSize: 25,
                        textAlign: "center"
                      }}
                    >
                      Forget
                    </Text>
                    </TouchableOpacity>*/}
                  <Button
                    full
                    rounded
                    dark
                    onPress={this.Forget}
                    title="Forget"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    Data: state.Login
  };
};
export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  containerview: {
    margin: 50,
    lineHeight: 75,
    height: 50,
    marginTop: 20
  },
  containerviews: {
    margin: 50,
    height: 50,
    marginTop: 20
  },
  containerviews: {
    backgroundColor: "#1e90ff",
    margin: 50,
    textAlign: "center",
    lineHeight: 75,
    fontSize: 30,
    height: 20,
    marginTop: 20
  },
  flexcontainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    height: 80
  },
  images: {
    height: 70,
    width: 80,
    borderRadius: 20
  },
  login: {
    height: 70,
    width: 60
  },
  buttons: {
    flex: 1,
    flexDirection: "row"
  },
  registerbtn: {
    width: 100,
    marginLeft: 80,
    marginRight: 100,
    height: 100
  },
  backgroundImage: {
    width: 380,
    marginTop: 5,
    marginLeft: 5,
    height: 380
  },
  contentContainer: {
    paddingVertical: 20
  },
  tab: {
    marginTop: 20,
    marginLeft: 30,
    color: "black",
    borderWidth: 1,
    backgroundColor: "gray"
  },
  tab1: {
    marginTop: 20,
    marginLeft: 100,
    color: "black",
    borderWidth: 1,
    backgroundColor: "gray"
  },
  body: {
    backgroundColor: "white"
  },
  title: {
    borderWidth: 1,
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 10,
    backgroundColor: "#ffa21d"
  },
  text: {
    textAlign: "center",
    color: "black"
  },
  header: {
    width: 380,
    marginTop: 3,
    height: "auto",
    marginLeft: 3,
    backgroundColor: "#ffa21d",
    borderWidth: 1,
    flexDirection: "row"
  },
  header_lft: {
    width: 100,
    height: "auto"
  },
  input: {
    margin: 15,
    height: 40,
    borderWidth: 1
  },
  logo: {
    width: 200,
    height: 100,
    textAlign: "center"
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    margin: 15,
    height: 40
  },
  img: {
    width: 120,
    height: 60
  },
  submitButtonText: {
    color: "white",
    textAlign: "center"
  }
});
