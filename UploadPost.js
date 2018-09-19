import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
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
  PixelRatio
} from "react-native";
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
class UploadPost extends Component {
  render() {
    return (
      <View>
        <Form>
          <Item floatingLabel style={{ marginRight: 20 }}>
            <Label>Title</Label>
            <Input onChangeText={this.props.SetText("title")} />
          </Item>
          <Text style={{ color: "red", marginLeft: 10 }}>
            {this.props.TitleMsg}
          </Text>
          <Dropdown
            label="Category"
            data={this.props.Data}
            style={{ width: 340, marginLeft: 70 }}
            onChangeText={this.props.SetText("category")}
            ref="category"
          />
          <Text style={{ color: "red", marginLeft: 10 }}>
            {this.props.CategoryMsg}
          </Text>
          <Item floatingLabel style={{ marginRight: 20 }}>
            <Label>Description</Label>
            <Input
              multiline={true}
              numberOfLines={10}
              onChangeText={this.props.SetText("description")}
              ref="description"
            />
          </Item>
          <Text style={{ color: "red", marginLeft: 10 }}>
            {this.props.DescriptionMsg}
          </Text>
          <TouchableOpacity onPress={this.props.SelectPhotoTapped}>
            <View
              style={[
                styles.avatar,
                styles.avatarContainer,
                { marginBottom: 20, marginTop: 10, marginLeft: 30 }
              ]}
            >
              {this.props.Image === null ? (
                <Text>Select a Photo</Text>
              ) : (
                <Image style={styles.avatar} source={this.props.Image} />
              )}
            </View>
          </TouchableOpacity>
          <Text style={{ color: "red", marginLeft: 10 }}>
            {this.props.ImageMsg}
          </Text>
        </Form>
        <Text style={{ color: "green", marginLeft: 10 }}>
          {this.props.PostUploadMsg}
        </Text>
        <Button
          block
          success
          onPress={this.props.uploadPost}
          style={{ marginRight: 20 }}
        >
          <Text>Upload Post</Text>
        </Button>
      </View>
    );
  }
}
export default UploadPost;
