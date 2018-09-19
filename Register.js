import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import Store from "./Store";
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
  Button,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
class Inputs extends Component {
  // state = {
  //   username: "",
  //   password: "",
  //   email: "",
  //   firstname: "",
  //   lastname: "",
  //   usernamemsg: "",
  //   passwordmsg: "",
  //   emailmsg: "",
  //   firstnamemsg: "",
  //   lastnamemsg: "",
  //   RegisterCnf: "",
  //   Error: false,
  //   Cliecked: false,
  //   ShowRed: 0
  // };
  HandleInput = fieldName => text => {
    if (fieldName === "email") {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === true) {
        // this.setState({ emailmsg: "Valid Email ", email: text });
        Store.dispatch({
          type: "Register_username",
          fieldName: "emailmsg",
          value: "Valid Email"
        });
        Store.dispatch({
          type: "Register_username",
          fieldName: "email",
          value: text
        });
      } else {
        // this.setState({ emailmsg: "InValid Email ", email: "" });
        Store.dispatch({
          type: "Register_username",
          fieldName: "emailmsg",
          value: "Invalid Email"
        });
      }
    } else {
      Store.dispatch({
        type: "Register_username",
        value: text,
        fieldName: fieldName
      });
      // this.setState({ [fieldName]: text });
    }
  };
  componentDidMount = async () => {
    let emails = await AsyncStorage.getItem("email");
    if (emails != null) {
      Actions.timeline();
    }
  };
  SignUp = async () => {
    if (this.props.Data.username === "") {
      // this.setState({
      //   usernamemsg: "Please , Enter username",
      //   RegisterCnf: ""
      // });
      Store.dispatch({
        type: "Register_username",
        fieldName: "usernamemsg",
        value: "Please , Enter username"
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "RegisterCnf",
        value: ""
      });
    } else if (this.props.Data.password === "") {
      this.setState({
        passwordmsg: "Please , Enter Password",
        usernamemsg: "",
        RegisterCnf: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "passwordmsg",
        value: "Please , Enter Password"
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "usernamemsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "RegisterCnf",
        value: ""
      });
    } else if (this.props.Data.email === "") {
      // this.setState({
      //   emailmsg: "Please , Enter Email",
      //   usernamemsg: "",
      //   passwordmsg: "",
      //   RegisterCnf: ""
      // });
      Store.dispatch({
        type: "Register_username",
        fieldName: "emailmsg",
        value: "Please , Enter Email"
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "passwordmsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "usernamemsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "RegisterCnf",
        value: ""
      });
    } else if (this.props.Data.firstname === "") {
      // this.setState({
      //   firstnamemsg: "Please , Enter FirstName",
      //   usernamemsg: "",
      //   passwordmsg: "",
      //   emailmsg: "",
      //   RegisterCnf: ""
      // });
      Store.dispatch({
        type: "Register_username",
        fieldName: "firstnamemsg",
        value: "Please , Enter FirstName"
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "emailmsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "passwordmsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "usernamemsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "RegisterCnf",
        value: ""
      });
    } else if (this.props.Data.lastname === "") {
      // this.setState({
      //   lastnamemsg: "Please , Enter Lastname",
      //   usernamemsg: "",
      //   passwordmsg: "",
      //   emailmsg: "",
      //   firstnamemsg: "",
      //   RegisterCnf: ""
      // });
      Store.dispatch({
        type: "Register_username",
        fieldName: "lastnamemsg",
        value: "Please , Enter Lastname"
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "firstnamemsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "emailmsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "passwordmsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "usernamemsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "RegisterCnf",
        value: ""
      });
    } else {
      // this.setState({
      //   lastnamemsg: "",
      //   emailmsg: "",
      //   RegisterCnf: "",
      //   Cliecked: true
      // });
      Store.dispatch({
        type: "Register_username",
        fieldName: "lastnamemsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "emailmsg",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "RegisterCnf",
        value: ""
      });
      Store.dispatch({
        type: "Register_username",
        fieldName: "Cliecked",
        value: true
      });
      try {
        await fetch("http://192.168.100.194:7187/signup", {
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
            // <Redirect to="/Login" />;
            // this.setState({ RegisterStatus: resp.data });
            if (
              resp.data === "Couldn't find your Google Account" ||
              resp.data === "User Already Registered"
            ) {
              // this.setState({
              //   RegisterCnf: resp.data,
              //   Cliecked: false,
              //   ShowRed: 1
              // });
              Store.dispatch({
                type: "Register_username",
                fieldName: "RegisterCnf",
                value: resp.data
              });
              Store.dispatch({
                type: "Register_username",
                fieldName: "Cliecked",
                value: false
              });
              Store.dispatch({
                type: "Register_username",
                fieldName: "ShowRed",
                value: 1
              });
            } else {
              // this.setState({
              //   RegisterCnf: resp.data,
              //   Cliecked: false,
              //   ShowRed: 0
              // });
              Store.dispatch({
                type: "Register_username",
                fieldName: "RegisterCnf",
                value: resp.data
              });
              Store.dispatch({
                type: "Register_username",
                fieldName: "Cliecked",
                value: false
              });
              Store.dispatch({
                type: "Register_username",
                fieldName: "ShowRed",
                value: 0
              });
            }
          });
      } catch (error) {
        setTimeout(() => {
          // this.setState({ Error: true });
          Store.dispatch({
            type: "Register_username",
            fieldName: "Error",
            value: true
          });
        }, 7000);
      }
    }
  };
  Login = () => {
    Actions.login();
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
              placeholder="Username"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChangeText={this.HandleInput("username")}
            />
            <Text style={{ marginLeft: 10, color: "red" }}>
              {this.props.Data.usernamemsg}
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
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChangeText={this.HandleInput("email")}
            />
            <Text style={{ marginLeft: 10, color: "red" }}>
              {this.props.Data.emailmsg}
            </Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="FirstName"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChangeText={this.HandleInput("firstname")}
            />
            <Text style={{ marginLeft: 10, color: "red" }}>
              {this.props.Data.firstnamemsg}
            </Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="LastName"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChangeText={this.HandleInput("lastname")}
            />
            <Text style={{ marginLeft: 10, color: "red" }}>
              {this.props.Data.lastnamemsg}
            </Text>

            {this.props.Data.Error === true ? (
              <Text style={{ color: "red", fontSize: 20, width: 300 }}>
                Connection timeout, Check connection with backend Server
              </Text>
            ) : this.props.Data.Cliecked === true ? (
              <ActivityIndicator size="large" color="green" />
            ) : this.props.Data.ShowRed === 1 ? (
              <Text style={{ marginLeft: 20, fontSize: 25, color: "red" }}>
                {this.props.Data.RegisterCnf}
              </Text>
            ) : (
              <Text style={{ marginLeft: 20, fontSize: 25, color: "green" }}>
                {this.props.Data.RegisterCnf}
              </Text>
            )}
            <View
              style={{
                display: "flex",
                margin: 10,
                flexDirection: "row",
                width: 300
              }}
            >
              <View
                style={{
                  margin: 10,
                  marginLeft: 50,

                  backgroundColor: "orange"
                }}
              >
                {/*<TouchableOpacity onPress={this.SignUp} opacity={0}>
                  <Text style={{ color: "#3b2f31", fontSize: 25 }}>
                    Register
                  </Text>
              </TouchableOpacity>*/}
                <Button
                  full
                  rounded
                  dark
                  onPress={this.SignUp}
                  title="Register"
                />
              </View>
              <View
                style={{
                  margin: 10,
                  marginLeft: 40,

                  backgroundColor: "orange"
                }}
              >
                {/*<TouchableOpacity onPress={this.Login}>
                  <Text style={{ color: "#3b2f31", fontSize: 25 }}>Login </Text>
              </TouchableOpacity>*/}
                <Button full rounded dark onPress={this.Login} title="Login" />
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
    Data: state.Register
  };
};
export default connect(mapStateToProps)(Inputs);

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
    borderWidth: 1,
    opacity: 1
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
