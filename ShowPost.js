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
  AsyncStorage
} from "react-native";
import React, { Component } from "react";
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
    height: 230
  },
  avatar2: {
    width: 300,
    height: 330,
    backgroundColor: "#98AFC7"
  },
  avatar1: {
    borderRadius: 5,
    width: 300,
    height: 200
  }
});
class ShowPost extends Component {
  render() {
    return (
      <View
        style={[
          styles.avatar2,
          styles.avatarContainer1,
          { marginBottom: 20, marginLeft: 10 }
        ]}
      >
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Text style={{ width: 80 }}>{this.props.title}</Text>
          <View style={{ marginLeft: 150 }}>
            <Text>{this.props.category}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ width: 150 }}>{this.props.uploadedby}</Text>
          <Text style={{ width: 80, marginLeft: 60 }}>{this.props.time}</Text>
        </View>
        <View>
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
              marginLeft: 10
            }}
          >
            <Text>
              Like-
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
            comment-
            {this.props.comments}
          </Text>
        </View>
      </View>
    );
  }
}
export default ShowPost;
