import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import ImagePicker from "react-native-image-picker";
import ShowPost from "./ShowPost";
import { connect } from "react-redux";
import Store from "./Store";
import UploadPost from "./UploadPost";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  InputGroup,
  Left,
  Right,
  Button
} from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  PixelRatio,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  ProgressBarAndroid
} from "react-native";
import Header from "./Header";
import ModalDropdown from "react-native-modal-dropdown";
import SideMenu from "react-native-side-menu";
import Menu from "./Menu";
import SinglePost from "./SinglePost";
// import UploadPost from "./UploadPost";
const image = require("./assets/menu.png");

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 20,
    padding: 10
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#98AFC7"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  avatarContainer1: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get()
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    borderRadius: 5,
    width: 200,
    height: 200
  },
  avatar2: {
    borderRadius: 5,
    width: 300,
    height: 300
  },
  avatar1: {
    borderRadius: 5,
    width: 300,
    height: 200
  }
});

class Basic extends Component {
  static onEnter = () => {
    console.warn("hiii");
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    // this.state = {
    //   isOpen: false,
    //   selectedItem: "TimeLine",
    //   image: null,
    //   title: "",
    //   category: "",
    //   description: "",
    //   titlemsg: "",
    //   categorymsg: "",
    //   descriptionmsg: "",
    //   imagemsg: "",
    //   email: "",
    //   PostUploadMsg: "",
    //   categoryUploadmsg: "",
    //   Post: [],
    //   Category: [],
    //   Username: "",
    //   SinglePost: false,
    //   Comment: "",
    //   Commentmsg: "",
    //   CategoryFilter: "",
    //   Error: false
    // };
  }
  SinglePost = fieldName => text => {
    // this.setState({ SinglePost: true, selectedItem: "" });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "SinglePost",
      value: true
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "selectedItem",
      value: ""
    });
    fetch("http://192.168.100.194:7187/AllSendData", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ data: "Send All Comment", Id: fieldName })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        if (resp.data === "No Comment") {
        } else {
          // this.setState({ Post: resp.data });
          Store.dispatch({
            type: "TimeLine_username",
            fieldName: "Post",
            value: resp.data
          });
        }
      });
  };
  UploadPost = async () => {
    if (this.props.Data.title === "") {
      // this.setState({ titlemsg: "Fill in Title" });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "titlemsg",
        value: "Fill in Title"
      });
    } else if (this.props.Data.category === "") {
      // this.setState({ categorymsg: "Fill in Category ", titlemsg: "" });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "categorymsg",
        value: "Fill in Category"
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "titlemsg",
        value: ""
      });
    } else if (this.props.Data.description === "") {
      // this.setState({
      //   descriptionmsg: "Fill in Description ",
      //   titlemsg: "",
      //   categorymsg: ""
      // });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "descriptionmsg",
        value: "Fill in Description"
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "titlemsg",
        value: ""
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "categorymsg",
        value: ""
      });
    } else if (this.props.Data.image === null) {
      // this.setState({
      //   imagemsg: "Please , Select Image",
      //   descriptionmsg: "",
      //   titlemsg: "",
      //   categorymsg: ""
      // });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "imagemsg",
        value: "Please , Select Image"
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "descriptionmsg",
        value: ""
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "titlemsg",
        value: ""
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "categorymsg",
        value: ""
      });
    } else {
      let emails = await AsyncStorage.getItem("email");
      // this.setState({
      //   imagemsg: "",
      //   descriptionmsg: "",
      //   titlemsg: "",
      //   categorymsg: ""
      // });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "imagemsg",
        value: ""
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "descriptionmsg",
        value: ""
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "titlemsg",
        value: ""
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "categorymsg",
        value: ""
      });
      let data = new FormData();
      data.append("image", this.props.Data.image.uri);
      data.append("title", this.props.Data.title);
      data.append("category", this.props.Data.category);
      data.append("description", this.props.Data.description);
      data.append("email", emails);
      fetch("http://192.168.100.194:7187/UploadPost", {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(response => {
          return response.json();
        })
        .then(resp => {
          // this.setState({
          //   PostUploadMsg: resp.data
          // });
          Store.dispatch({
            type: "TimeLine_username",
            fieldName: "PostUploadMsg",
            value: resp.data
          });
          fetch("http://192.168.100.194:7187/AllSendData", {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
              email: emails,
              data: "SendData"
            })
          })
            .then(response => {
              return response.json();
            })
            .then(resp => {
              // this.setState({ Post: resp.data, Error: false });
              Store.dispatch({
                type: "TimeLine_username",
                fieldName: "Post",
                value: resp.data
              });
              Store.dispatch({
                type: "TimeLine_username",
                fieldName: "Error",
                value: false
              });
            });
          let tim = setTimeout(() => {
            // this.setState({
            //   image: null,
            //   PostUploadMsg: "",
            //   selectedItem: "TimeLine"
            // });
            Store.dispatch({
              type: "TimeLine_username",
              fieldName: "image",
              value: null
            });
            Store.dispatch({
              type: "TimeLine_username",
              fieldName: "PostUploadMsg",
              value: ""
            });
            Store.dispatch({
              type: "TimeLine_username",
              fieldName: "selectedItem",
              value: "TimeLine"
            });
          }, 2000);
        });
    }
  };
  componentDidMount = async () => {
    // this.setState({
    //   Username: await AsyncStorage.getItem("Username"),
    //   email: await AsyncStorage.getItem("email")
    // });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "Username",
      value: await AsyncStorage.getItem("Username")
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "SinglePost",
      value: false
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "email",
      value: await AsyncStorage.getItem("email")
    });
    fetch("http://192.168.100.194:7187/AllSendData", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        data: "SendAllPostData"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        if (resp.data.length != 0) {
          // this.setState({ Post: resp.data });
          Store.dispatch({
            type: "TimeLine_username",
            fieldName: "Post",
            value: resp.data
          });
        } else {
          setTimeout(() => {
            // this.setState({ Error: true });
            Store.dispatch({
              type: "TimeLine_username",
              fieldName: "Error",
              value: true
            });
          }, 7000);
        }
      });
    //Uploading Category Data
    fetch("http://192.168.100.194:7187/AllSendData", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: await AsyncStorage.getItem("email"),
        data: "SendCategory"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        // this.setState({ Category: resp.data });
        Store.dispatch({
          type: "TimeLine_username",
          fieldName: "Category",
          value: resp.data
        });
      });
  };
  AddLike = fieldName => async text => {
    if (this.props.Data.selectedItem === "TimeLine") {
      // this.setState({ SinglePost: false });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "SinglePost",
        value: false
      });
    } else if (this.props.Data.SinglePost === true) {
      // this.setState({ selectedItem: "" });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "selectedItem",
        value: ""
      });
    }
    fetch("http://192.168.100.194:7187/AllSendData", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: await AsyncStorage.getItem("email"),
        ID: fieldName,
        data: "AddLike",
        Selected: this.props.Data.selectedItem,
        SinglePost: this.props.Data.SinglePost,
        category: this.props.Data.CategoryFilter
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        // this.setState({ Post: resp.data });
        Store.dispatch({
          type: "TimeLine_username",
          fieldName: "Post",
          value: resp.data
        });
      });
  };
  UploadComment = fieldName => async text => {
    if (this.props.Data.Comment === "") {
      // this.setState({ Commentmsg: "Please, Fill in Comment" });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "Commentmsg",
        value: "Please, Fill in Comment"
      });
    } else {
      // this.setState({ Commentmsg: "" });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "Commentmsg",
        value: ""
      });
      fetch("http://192.168.100.194:7187/AllSendData", {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data: "SubmitComment",
          Id: fieldName,
          CommentedBy: await AsyncStorage.getItem("email"),
          Comment: this.props.Data.Comment
        })
      })
        .then(response => {
          return response.json();
        })
        .then(resp => {
          // this.setState({ Post: resp.data, Comment: "" });
          Store.dispatch({
            type: "TimeLine_username",
            fieldName: "Post",
            value: resp.data
          });
          Store.dispatch({
            type: "TimeLine_username",
            fieldName: "Comment",
            value: ""
          });
        });
    }
  };
  UploadCategory = async () => {
    if (this.props.Data.image === null) {
      // this.setState({ imagemsg: "Please , Select Image" });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "imagemsg",
        value: "Please , Select Image"
      });
    } else if (this.props.Data.category === "") {
      // this.setState({
      //   categorymsg: "Please , fill Category ",
      //   imagemsg: "",
      //   titlemsg: ""
      // });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "categorymsg",
        value: "Please , fill Category"
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "imagemsg",
        value: ""
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "titlemsg",
        value: ""
      });
    } else {
      // this.setState({ categorymsg: "", imagemsg: "", titlemsg: "" });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "categorymsg",
        value: ""
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "imagemsg",
        value: ""
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "titlemsg",
        value: ""
      });
      let emails = await AsyncStorage.getItem("email");
      let data = new FormData();
      data.append("image", this.props.Data.image.uri);
      data.append("category", this.props.Data.category);
      data.append("email", emails);
      fetch("http://192.168.100.194:7187/UploadCategory", {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(response => {
          return response.json();
        })
        .then(resp => {
          // this.setState({ categoryUploadmsg: resp.data });
          Store.dispatch({
            type: "TimeLine_username",
            fieldName: "categoryUploadmsg",
            value: resp.data
          });
          fetch("http://192.168.100.194:7187/AllSendData", {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
              email: emails,
              data: "SendCategory"
            })
          })
            .then(response => {
              return response.json();
            })
            .then(resp => {
              // this.setState({ Category: resp.data });
              Store.dispatch({
                type: "TimeLine_username",
                fieldName: "Category",
                value: resp.data
              });
            });
          let tim = setTimeout(() => {
            // this.setState({
            //   selectedItem: "TimeLine"
            // });
            Store.dispatch({
              type: "TimeLine_username",
              fieldName: "selectedItem",
              value: "TimeLine"
            });
          }, 2000);
        });
    }
  };
  toggle() {
    // this.setState({
    //   isOpen: !this.state.isOpen,
    //   image: null,
    //   imagemsg: "",
    //   category: "",
    //   categorymsg: "",
    //   categoryUploadmsg: "",
    //   PostUploadMsg: ""
    // });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "isOpen",
      value: !this.props.Data.isOpen
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "image",
      value: null
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "imagemsg",
      value: ""
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "category",
      value: ""
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "categorymsg",
      value: ""
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "categoryUploadmsg",
      value: ""
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "PostUploadMsg",
      value: ""
    });
  }
  setText = fieldName => text => {
    if (text != "") {
      // this.setState({ [fieldName]: text, [fieldName + "msg"]: "" });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: fieldName,
        value: text
      });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: fieldName + "msg",
        value: ""
      });
    } else {
      // this.setState({ [fieldName + "msg"]: "Please fill " + fieldName });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: fieldName + "msg",
        value: "Please fill " + fieldName
      });
    }
  };
  updateMenuState(isOpen) {
    // this.setState({ isOpen });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "isOpen",
      value: isOpen
    });
  }
  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        // this.setState({
        //   image: source,
        //   imagemsg: ""
        // });
        Store.dispatch({
          type: "TimeLine_username",
          fieldName: "image",
          value: source
        });
        Store.dispatch({
          type: "TimeLine_username",
          fieldName: "imagemsg",
          value: ""
        });
      }
    });
  };
  SendLatest = async () => {
    fetch("http://192.168.100.194:7187/AllSendData", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        data: "SendLatestFirst",
        SelectedItem: this.props.Data.selectedItem,
        email: await AsyncStorage.getItem("email"),
        Category: this.props.Data.CategoryFilter
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        // this.setState({ Post: resp.data });
        Store.dispatch({
          type: "TimeLine_username",
          fieldName: "Post",
          value: resp.data
        });
      });
  };
  SendOldest = async () => {
    fetch("http://192.168.100.194:7187/AllSendData", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        data: "SendOldestFirst",
        SelectedItem: this.props.Data.selectedItem,
        email: await AsyncStorage.getItem("email"),
        Category: this.props.Data.CategoryFilter
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        // this.setState({ Post: resp.data });
        Store.dispatch({
          type: "TimeLine_username",
          fieldName: "Post",
          value: resp.data
        });
      });
  };
  SentMostCommented = async () => {
    fetch("http://192.168.100.194:7187/AllSendData", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        data: "MostCommented",
        SelectedItem: this.props.Data.selectedItem,
        email: await AsyncStorage.getItem("email"),
        Category: this.props.Data.CategoryFilter
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        let ccou = resp.data;
        console.log("Most Commented", resp.data);
        // this.setState({ Post: resp.data });
        Store.dispatch({
          type: "TimeLine_username",
          fieldName: "Post",
          value: resp.data
        });
      });
  };
  onMenuItemSelected1 = async item => {
    // this.setState({
    //   selectedItem: "",
    //   isOpen: false,
    //   SinglePost: false,
    //   CategoryFilter: item
    // });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "selectedItem",
      value: ""
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "isOpen",
      value: false
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "SinglePost",
      value: false
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "CategoryFilter",
      value: item
    });
    fetch("http://192.168.100.194:7187/AllSendData", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        category: item,
        email: await AsyncStorage.getItem("email"),
        data: "PostFilter"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        if (resp.data === "No Record Found") {
          // this.setState({ Post: "" });
          Store.dispatch({
            type: "TimeLine_username",
            fieldName: "Post",
            value: ""
          });
        } else {
          // this.setState({ Post: resp.data });
          Store.dispatch({
            type: "TimeLine_username",
            fieldName: "Post",
            value: resp.data
          });
        }
      });
  };

  show = () => {
    // this.setState({ ShowDetails: true });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "ShowDetails",
      value: true
    });
  };
  onMenuItemSelected = async item => {
    // this.setState({
    //   isOpen: false,
    //   selectedItem: item,
    //   SinglePost: false
    // });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "isOpen",
      value: false
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "selectedItem",
      value: item
    });
    Store.dispatch({
      type: "TimeLine_username",
      fieldName: "SinglePost",
      value: false
    });
    if (this.props.Data.selectedItem === "TimeLine") {
      fetch("http://192.168.100.194:7187/AllSendData", {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data: "SendAllPostData"
        })
      })
        .then(response => {
          return response.json();
        })
        .then(resp => {
          // this.setState({ Post: resp.data });
          Store.dispatch({
            type: "TimeLine_username",
            fieldName: "Post",
            value: resp.data
          });
        });
    } else {
      // this.setState({ Post: [] });
      Store.dispatch({
        type: "TimeLine_username",
        fieldName: "Post",
        value: []
      });
      fetch("http://192.168.100.194:7187/AllSendData", {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          email: await AsyncStorage.getItem("email"),
          data: "SendData"
        })
      })
        .then(response => {
          return response.json();
        })
        .then(resp => {
          if (resp.data.length != 0) {
            // this.setState({ Post: resp.data });
            Store.dispatch({
              type: "TimeLine_username",
              fieldName: "Post",
              value: resp.data
            });
          } else {
            setTimeout(() => {
              // this.setState({ Error: true });
              Store.dispatch({
                type: "TimeLine_username",
                fieldName: "Error",
                value: true
              });
            }, 7000);
          }
        });
    }
  };
  render() {
    let Final = [];
    this.props.Data.Category.map(data => Final.push({ value: data.category }));
    let { width } = Dimensions.get("window");
    width = width * 0.9;
    return (
      <SideMenu
        menu={
          <Menu
            onItemSelected={this.onMenuItemSelected}
            username={this.props.Data.Username}
            Category={this.props.Data.Category}
            onItemSelected1={this.onMenuItemSelected1}
          />
        }
        isOpen={this.props.Data.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <Header />
        {this.props.Data.selectedItem != "UploadPost" &&
        this.props.Data.selectedItem != "UploadCategory" &&
        this.props.Data.SinglePost != true ? (
          <View
            style={{
              borderColor: "orange",
              flexDirection: "column",

              backgroundColor: "#ADD8E6",
              flexDirection: "row",
              marginLeft: 15,
              justifyContent: "space-between"
            }}
          >
            <Text onPress={this.SendLatest}>Latest First</Text>
            <Text onPress={this.SendOldest}>Oldest First</Text>
            <Text onPress={this.SentMostCommented}>MostCommented First</Text>
          </View>
        ) : (
          <View />
        )}
        {this.props.Data.selectedItem === "TimeLine" ? (
          <View style={styles.container}>
            <Container style={{ width: 360, marginLeft: 60 }}>
              <Content>
                {this.props.Data.Post.length != 0 ? (
                  this.props.Data.Post.map((data, index) => (
                    <ShowPost
                      key={index}
                      ID={data._id}
                      check={{ uri: data.files }}
                      singlePost={this.SinglePost}
                      title={data.title}
                      category={data.category}
                      uploadedby={data.email}
                      time={data.Time}
                      AddLike={this.AddLike}
                      Likes={data.Like.length}
                      comments={data.Comments.length}
                      Show={this.show}
                      description={data.description}
                    />
                  ))
                ) : this.props.Data.Error === true ? (
                  <Text style={{ color: "red", fontSize: 20 }}>
                    Connection TimeOut ! Check Connection with Backend Server or
                    may Post Not available
                  </Text>
                ) : (
                  <ActivityIndicator size="large" color="green" />
                )}
              </Content>
            </Container>
          </View>
        ) : this.props.Data.selectedItem === "UploadPost" ? (
          <View style={styles.container}>
            <Container style={{ width: 300, marginLeft: 20, marginTop: 30 }}>
              <Content
                style={{
                  marginLeft: 30,
                  marginTop: 50
                }}
              >
                <UploadPost
                  SetText={this.setText}
                  TitleMsg={this.props.Data.titlemsg}
                  Data={Final}
                  CategoryMsg={this.props.Data.categorymsg}
                  SelectPhotoTapped={this.selectPhotoTapped}
                  Image={this.props.Data.image}
                  ImageMsg={this.props.Data.imagemsg}
                  PostUploadMsg={this.props.Data.PostUploadMsg}
                  uploadPost={this.UploadPost}
                  DescriptionMsg={this.props.Data.descriptionmsg}
                />
              </Content>
            </Container>
          </View>
        ) : this.props.Data.selectedItem === "UploadCategory" ? (
          <View style={styles.container}>
            <Container style={{ width: 300, marginLeft: 20, marginTop: 30 }}>
              <Content
                style={{
                  marginLeft: 30,
                  marginTop: 50
                }}
              >
                <Text style={{ color: "black", fontSize: 25 }}>
                  Upload Category
                </Text>
                <TouchableOpacity
                  onPress={this.selectPhotoTapped}
                  style={{ marginLeft: 20 }}
                >
                  <View
                    style={[
                      styles.avatar,
                      styles.avatarContainer,
                      { marginBottom: 20, marginTop: 20 }
                    ]}
                  >
                    {this.props.Data.image === null ? (
                      <Text>Select a Photo</Text>
                    ) : (
                      <Image
                        style={styles.avatar}
                        source={this.props.Data.image}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={{ color: "red" }}>{this.props.Data.imagemsg}</Text>
                <Form>
                  <Item
                    floatingLabel
                    style={{ marginLeft: 10, marginRight: 20 }}
                  >
                    <Label style={{ marginLeft: 10 }}>Category</Label>
                    <Input onChangeText={this.setText("category")} />
                  </Item>
                  <Text style={{ marginTop: 10, color: "red" }}>
                    {this.props.Data.categorymsg}
                  </Text>
                </Form>
                <Text style={{ color: "green", marginLeft: 10 }}>
                  {this.props.Data.categoryUploadmsg}
                </Text>
                <Button
                  block
                  success
                  onPress={this.UploadCategory}
                  style={{ marginTop: 50, marginRight: 20 }}
                >
                  <Text>Upload Category</Text>
                </Button>
              </Content>
            </Container>
          </View>
        ) : this.props.Data.SinglePost === true ? (
          <View style={styles.container}>
            <Container style={{ width: 350, marginLeft: 60 }}>
              <Content style={{ marginLeft: 20, marginRight: 20 }}>
                {this.props.Data.Post.length != 0 ? (
                  this.props.Data.Post.map((data, index) => (
                    <SinglePost
                      key={index}
                      ID={data._id}
                      check={{ uri: data.files }}
                      title={data.title}
                      category={data.category}
                      uploadedby={data.email}
                      time={data.Time}
                      AddLike={this.AddLike}
                      Likes={data.Like.length}
                      comments={data.Comments.length}
                      SetText={this.setText}
                      UploadComment={this.UploadComment}
                      CommentMsg={this.props.Data.Commentmsg}
                      Comment={data.Comments}
                    />
                  ))
                ) : (
                  <Text>OOPs, No Any Record Found</Text>
                )}
              </Content>
            </Container>
          </View>
        ) : this.props.Data.selectedItem === "MyUpload" ? (
          <View style={styles.container}>
            <Container style={{ width: 350, marginLeft: 60 }}>
              <Content style={{ marginLeft: 20, marginRight: 20 }}>
                {this.props.Data.Post.length != 0 ? (
                  this.props.Data.Post.map((data, index) => (
                    <ShowPost
                      key={index}
                      ID={data._id}
                      check={{ uri: data.files }}
                      singlePost={this.SinglePost}
                      title={data.title}
                      category={data.category}
                      uploadedby={data.email}
                      time={data.Time}
                      AddLike={this.AddLike}
                      Likes={data.Like.length}
                      comments={data.Comments.length}
                    />
                  ))
                ) : this.props.Data.Error === true ? (
                  <Text style={{ color: "red", fontSize: 20 }}>
                    Connection TimeOut ! Check Connection with Backend Server or
                    may Post Not available
                  </Text>
                ) : (
                  <ActivityIndicator size="large" color="green" />
                )}
              </Content>
            </Container>
          </View>
        ) : (
          <View style={styles.container}>
            <Container style={{ width: 350, marginLeft: 60 }}>
              <Content style={{ marginLeft: 20, marginRight: 20 }}>
                {this.props.Data.Post.length != 0 ? (
                  this.props.Data.Post.map((data, index) => (
                    <ShowPost
                      key={index}
                      ID={data._id}
                      check={{ uri: data.files }}
                      singlePost={this.SinglePost}
                      title={data.title}
                      category={data.category}
                      uploadedby={data.email}
                      time={data.Time}
                      AddLike={this.AddLike}
                      Likes={data.Like.length}
                      comments={data.Comments.length}
                      description={data.description}
                    />
                  ))
                ) : (
                  <Text>OOPs, No Any Record Found</Text>
                )}
              </Content>
            </Container>
          </View>
        )}
        <TouchableOpacity onPress={this.toggle} style={styles.button}>
          <Image
            source={image}
            style={{ width: 32, height: 32, marginTop: 70 }}
          />
        </TouchableOpacity>
      </SideMenu>
    );
  }
}
const mapStateToProps = state => {
  return {
    Data: state.TimeLine
  };
};
export default connect(mapStateToProps)(Basic);
