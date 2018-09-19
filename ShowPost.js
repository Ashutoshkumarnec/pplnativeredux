import {
  Container,
  Content,
  Header,
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
import React, { Component } from "react";
import Moment from "react-moment";
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
    borderColor: "#9B9B9B"
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
    height: 230
  },
  avatar2: {
    width: 300,
    height: 380,
    backgroundColor: "white"
  },
  avatar1: {
    width: 350,
    height: 250
  },
  avatar4: {
    width: 40,
    height: 45,
    borderRadius: 24,
    flex: 1
  }
});
const uri = "https://pickaface.net/gallery/avatar/Opi51c74d6edb145.png";
class ShowPost extends Component {
  constructor() {
    super();
    this.state = {
      ShowDetails: false
    };
  }
  show = () => {
    this.setState({ ShowDetails: !this.state.ShowDetails });
  };
  shows = () => {
    this.setState({ ShowDetails: false });
  };
  render() {
    return (
      <View>
        {this.state.ShowDetails === true ? (
          <View
            style={{
              display: "flex",
              position: "absolute",
              width: 310,
              height: 300,
              backgroundColor: "white",
              opacity: 0.8,
              margin: "auto",
              padding: 20,
              marginTop: 50,
              zIndex: 1,
              borderRadius: 10,
              borderColor: "orange",
              borderWidth: 1
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ marginLeft: 10, marginTop: 10 }}>
                Title : {this.props.title}
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 10 }}>
                Category : {this.props.category}
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 10 }}>
                Time : {this.props.time}
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 10 }}>
                Description : {this.props.description}
              </Text>
            </View>
          </View>
        ) : (
          <Text />
        )}

        <View
          style={[
            styles.avatar2,
            styles.avatarContainer1,
            { marginBottom: 20, marginLeft: 10 }
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <Image style={styles.avatar4} source={{ uri }} />
            <Text style={{ width: 80, marginLeft: 10, marginTop: 10 }}>
              {this.props.uploadedby}
            </Text>
            <TouchableOpacity onPress={this.show}>
              <View style={{ marginLeft: 140, flexDirection: "column" }}>
                {/*<Text>{this.props.category}</Text>*/}
                <View
                  style={{
                    width: 10,
                    height: 5,
                    backgroundColor: "black",
                    margin: 3,
                    borderRadius: 5
                  }}
                />
                <View
                  style={{
                    width: 10,
                    height: 5,
                    backgroundColor: "orange",
                    margin: 3,
                    borderRadius: 5
                  }}
                />
                <View
                  style={{
                    width: 10,
                    height: 5,
                    backgroundColor: "black",
                    margin: 3,
                    borderRadius: 5
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ width: 150 }}>{this.props.uploadedby}</Text>
            <Text style={{ width: 80, marginLeft: 60 }}>{this.props.time}</Text>
          </View>*/}
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={this.props.singlePost(this.props.ID)}>
              <Image style={styles.avatar1} source={this.props.check} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              onPress={this.props.AddLike(this.props.ID)}
              style={{
                marginTop: 3,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                backgroundColor: "white"
              }}
            >
              <Text>
                <Text
                  style={{
                    fontSize: 50,
                    opacity: 0.5
                  }}
                >
                  👍
                </Text>
                {this.props.Likes}
              </Text>
            </Button>

            <Text
              style={{
                marginTop: 3,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 40,
                width: 100
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  opacity: 0.5
                }}
              >
                💬
              </Text>
              {this.props.comments}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderColor: "gray",
            flexDirection: "row",
            borderWidth: 1,
            marginTop: 5,
            opacity: 0.5
          }}
        />
      </View>
    );
  }
}
export default ShowPost;
