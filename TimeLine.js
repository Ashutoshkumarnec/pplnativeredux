import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import ImagePicker from "react-native-image-picker";
import ShowPost from "./ShowPost";
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
  ScrollView
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
    backgroundColor: "#F5FCFF"
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

export default class Basic extends Component {
  static onEnter = () => {
    console.warn("hiii");
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: "TimeLine",
      image: null,
      title: "",
      category: "",
      description: "",
      titlemsg: "",
      categorymsg: "",
      descriptionmsg: "",
      imagemsg: "",
      email: "",
      PostUploadMsg: "",
      categoryUploadmsg: "",
      Post: [],
      Category: [],
      Username: "",
      SinglePost: false,
      Comment: "",
      Commentmsg: "",
      CategoryFilter: ""
    };
  }
  SinglePost = fieldName => text => {
    this.setState({ SinglePost: true, selectedItem: "" });
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
          this.setState({ Post: resp.data });
        }
      });
  };
  UploadPost = async () => {
    if (this.state.title === "") {
      this.setState({ titlemsg: "Fill in Title" });
    } else if (this.state.category === "") {
      this.setState({ categorymsg: "Fill in Category ", titlemsg: "" });
    } else if (this.state.description === "") {
      this.setState({
        descriptionmsg: "Fill in Description ",
        titlemsg: "",
        categorymsg: ""
      });
    } else if (this.state.image === null) {
      this.setState({
        imagemsg: "Please , Select Image",
        descriptionmsg: "",
        titlemsg: "",
        categorymsg: ""
      });
    } else {
      let emails = await AsyncStorage.getItem("email");
      this.setState({
        imagemsg: "",
        descriptionmsg: "",
        titlemsg: "",
        categorymsg: ""
      });

      let data = new FormData();
      data.append("image", this.state.image.uri);
      data.append("title", this.state.title);
      data.append("category", this.state.category);
      data.append("description", this.state.description);
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
          this.setState({
            PostUploadMsg: resp.data
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
              this.setState({ Post: resp.data });
            });
          let tim = setTimeout(() => {
            this.setState({
              image: null,
              PostUploadMsg: "",
              selectedItem: "TimeLine"
            });
          }, 2000);
        });
    }
  };
  componentDidMount = async () => {
    this.setState({
      Username: await AsyncStorage.getItem("Username"),
      email: await AsyncStorage.getItem("email")
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
        this.setState({ Post: resp.data });
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
        this.setState({ Category: resp.data });
      });
  };
  AddLike = fieldName => async text => {
    if (this.state.selectedItem === "TimeLine") {
      this.setState({ SinglePost: false });
    } else if (this.state.SinglePost === true) {
      this.setState({ selectedItem: "" });
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
        Selected: this.state.selectedItem,
        SinglePost: this.state.SinglePost,
        category: this.state.CategoryFilter
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        this.setState({ Post: resp.data });
      });
  };
  UploadComment = fieldName => async text => {
    if (this.state.Comment === "") {
      this.setState({ Commentmsg: "Please, Fill in Comment" });
    } else {
      this.setState({ Commentmsg: "" });
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
          Comment: this.state.Comment
        })
      })
        .then(response => {
          return response.json();
        })
        .then(resp => {
          this.setState({ Post: resp.data, Comment: "" });
        });
    }
  };
  UploadCategory = async () => {
    if (this.state.image === null) {
      this.setState({ imagemsg: "Please , Select Image" });
    } else if (this.state.category === "") {
      this.setState({
        categorymsg: "Please , fill Category ",
        imagemsg: "",
        titlemsg: ""
      });
    } else {
      this.setState({ categorymsg: "", imagemsg: "", titlemsg: "" });
      let emails = await AsyncStorage.getItem("email");
      let data = new FormData();
      data.append("image", this.state.image.uri);
      data.append("category", this.state.category);
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
          this.setState({ categoryUploadmsg: resp.data });
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
              this.setState({ Category: resp.data });
            });
          let tim = setTimeout(() => {
            this.setState({
              selectedItem: "TimeLine"
            });
          }, 2000);
        });
    }
  };
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      image: null,
      imagemsg: "",
      category: "",
      categorymsg: "",
      categoryUploadmsg: "",
      PostUploadMsg: ""
    });
  }
  setText = fieldName => text => {
    if (text != "") {
      this.setState({ [fieldName]: text, [fieldName + "msg"]: "" });
    } else {
      this.setState({ [fieldName + "msg"]: "Please fill " + fieldName });
    }
  };
  updateMenuState(isOpen) {
    this.setState({ isOpen });
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
        this.setState({
          image: source,
          imagemsg: ""
        });
        console.warn(this.state.image);
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
        SelectedItem: this.state.selectedItem,
        email: await AsyncStorage.getItem("email"),
        Category: this.state.CategoryFilter
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        this.setState({ Post: resp.data });
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
        SelectedItem: this.state.selectedItem,
        email: await AsyncStorage.getItem("email"),
        Category: this.state.CategoryFilter
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        this.setState({ Post: resp.data });
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
        SelectedItem: this.state.selectedItem,
        email: await AsyncStorage.getItem("email"),
        Category: this.state.CategoryFilter
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        let ccou = resp.data;
        console.log("Most Commented", resp.data);
        this.setState({ Post: resp.data });
      });
  };
  onMenuItemSelected1 = async item => {
    this.setState({
      selectedItem: "",
      isOpen: false,
      SinglePost: false,
      CategoryFilter: item
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
          this.setState({ Post: "" });
        } else {
          this.setState({ Post: resp.data });
        }
      });
  };
  onMenuItemSelected = async item => {
    this.setState({
      isOpen: false,
      selectedItem: item,
      SinglePost: false
    });
    if (this.state.selectedItem === "TimeLine") {
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
          this.setState({ Post: resp.data });
        });
    } else {
      this.setState({ Post: [] });
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
          this.setState({ Post: resp.data });
        });
    }
  };
  render() {
    let Final = [];
    this.state.Category.map(data => Final.push({ value: data.category }));
    let { width } = Dimensions.get("window");
    width = width * 0.9;
    return (
      <SideMenu
        menu={
          <Menu
            onItemSelected={this.onMenuItemSelected}
            username={this.state.Username}
            Category={this.state.Category}
            onItemSelected1={this.onMenuItemSelected1}
          />
        }
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <Header />
        {this.state.selectedItem != "UploadPost" &&
        this.state.selectedItem != "UploadCategory" &&
        this.state.SinglePost != true ? (
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
        {this.state.selectedItem === "TimeLine" ? (
          <View style={styles.container}>
            <Container style={{ width: 350, marginLeft: 60 }}>
              <Content
                style={{ marginLeft: 10, marginRight: 20, marginTop: 5 }}
              >
                {this.state.Post.length != 0 ? (
                  this.state.Post.map((data, index) => (
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
                ) : (
                  <Text style={{ color: "green", fontSize: 30 }}>
                    Please Wait ..... loading
                  </Text>
                )}
              </Content>
            </Container>
          </View>
        ) : this.state.selectedItem === "UploadPost" ? (
          <View style={styles.container}>
            <Container style={{ width: 350, marginLeft: 60 }}>
              <Content style={{ marginLeft: 20, marginRight: 20 }}>
                <UploadPost
                  SetText={this.setText}
                  TitleMsg={this.state.titlemsg}
                  Data={Final}
                  CategoryMsg={this.state.categorymsg}
                  SelectPhotoTapped={this.selectPhotoTapped}
                  Image={this.state.image}
                  ImageMsg={this.state.imagemsg}
                  PostUploadMsg={this.state.PostUploadMsg}
                  uploadPost={this.UploadPost}
                  DescriptionMsg={this.state.descriptionmsg}
                />
              </Content>
            </Container>
          </View>
        ) : this.state.selectedItem === "UploadCategory" ? (
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
                    {this.state.image === null ? (
                      <Text>Select a Photo</Text>
                    ) : (
                      <Image style={styles.avatar} source={this.state.image} />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={{ color: "red" }}>{this.state.imagemsg}</Text>
                <Form>
                  <Item
                    floatingLabel
                    style={{ marginLeft: 10, marginRight: 20 }}
                  >
                    <Label style={{ marginLeft: 10 }}>Category</Label>
                    <Input onChangeText={this.setText("category")} />
                  </Item>
                  <Text style={{ marginTop: 10, color: "red" }}>
                    {this.state.categorymsg}
                  </Text>
                </Form>
                <Text style={{ color: "green", marginLeft: 10 }}>
                  {this.state.categoryUploadmsg}
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
        ) : this.state.SinglePost === true ? (
          <View style={styles.container}>
            <Container style={{ width: 350, marginLeft: 60 }}>
              <Content style={{ marginLeft: 20, marginRight: 20 }}>
                {this.state.Post.length != 0 ? (
                  this.state.Post.map((data, index) => (
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
                      CommentMsg={this.state.Commentmsg}
                      Comment={data.Comments}
                    />
                  ))
                ) : (
                  <Text>OOPs, No Any Record Found</Text>
                )}
              </Content>
            </Container>
          </View>
        ) : this.state.selectedItem === "MyUpload" ? (
          <View style={styles.container}>
            <Container style={{ width: 350, marginLeft: 60 }}>
              <Content style={{ marginLeft: 20, marginRight: 20 }}>
                {this.state.Post.length != 0 ? (
                  this.state.Post.map((data, index) => (
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
                ) : (
                  <Text style={{ color: "green", fontSize: 30 }}>
                    Please Wait ..... loading
                  </Text>
                )}
              </Content>
            </Container>
          </View>
        ) : (
          <View style={styles.container}>
            <Container style={{ width: 350, marginLeft: 60 }}>
              <Content style={{ marginLeft: 20, marginRight: 20 }}>
                {this.state.Post.length != 0 ? (
                  this.state.Post.map((data, index) => (
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
                ) : (
                  <Text>OOPs, No Any Record Found</Text>
                )}
              </Content>
            </Container>
          </View>
        )}

        <TouchableOpacity onPress={this.toggle} style={styles.button}>
          <Image source={image} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
      </SideMenu>
    );
  }
}
