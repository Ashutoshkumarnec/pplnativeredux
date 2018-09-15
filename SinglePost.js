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

const uri = "https://pickaface.net/gallery/avatar/Opi51c74d6edb145.png";
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
  input: {
    margin: 15,
    height: 40,
    borderWidth: 1,
    opacity: 1
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
  avatarContainer4: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar4: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
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
    borderRadius: 5,
    width: 400,
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
      <View>
        <View
          style={[
            styles.avatar2,
            styles.avatarContainer1,
            { marginBottom: 20, marginTop: 10, marginLeft: 10 }
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
            <TouchableOpacity>
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
        <View>
          <Text style={{ fontSize: 20, color: "black" }}>Comments :: </Text>
          {this.props.Comment.map(data => (
            <View style={{ flexDirection: "row" }}>
              <View
                style={[styles.avatarContainer4, { flexDirection: "column" }]}
              >
                <Image style={styles.avatar4} source={{ uri }} />
                <Text style={{ marginTop: 20 }}>{data.CommentedBy}</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text>{data.Comment}</Text>
              </View>
            </View>
          ))}
          <Item floatingLabel>
            <Label>Comment</Label>
            <Input onChangeText={this.props.SetText("Comment")} />
          </Item>
          <Text style={{ color: "red" }}>{this.props.CommentMsg}</Text>
          <Button
            block
            success
            onPress={this.props.UploadComment(this.props.ID)}
            style={{
              marginTop: 20,
              marginLeft: 50,
              marginRight: 20,
              width: 200
            }}
          >
            <Text>Submit</Text>
          </Button>
        </View>
      </View>
    );
  }
}
export default ShowPost;
