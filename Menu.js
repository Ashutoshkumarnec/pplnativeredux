import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage
} from "react-native";

const window = Dimensions.get("window");
const uri = "https://pickaface.net/gallery/avatar/jman200451e5435985c67.png";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "#ADD8E6",
    padding: 20
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  name: {
    position: "absolute",
    left: 70,
    top: 20
  },
  item: {
    fontSize: 14,
    fontWeight: "300",
    paddingTop: 5
  },
  item1: {
    fontSize: 20,
    fontWeight: "300",
    paddingTop: 20
  }
});

export default function Menu({
  onItemSelected,
  onItemSelected1,
  username,
  Category
}) {
  let data = 1;
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri }} />
        <Text style={styles.name}>Welcome , {username}</Text>
      </View>
      <View
        style={{
          borderColor: "orange",
          flexDirection: "row",
          borderWidth: 1,
          marginTop: 5
        }}
      />
      <Text onPress={() => onItemSelected("TimeLine")} style={styles.item}>
        TimeLine
      </Text>

      <Text onPress={() => onItemSelected("UploadPost")} style={styles.item}>
        UploadPost
      </Text>
      <Text
        onPress={() => onItemSelected("UploadCategory")}
        style={styles.item}
      >
        UploadCategory
      </Text>
      <Text onPress={() => onItemSelected("MyUpload")} style={styles.item}>
        MyUpload
      </Text>
      <View
        style={{
          borderColor: "orange",
          flexDirection: "row",
          borderWidth: 1,
          marginTop: 5
        }}
      />
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.item1}>Category Uploaded</Text>
        <View
          style={{
            borderColor: "orange",
            flexDirection: "row",
            borderWidth: 1,
            marginTop: 5
          }}
        />
        {Category.map((data, index) => (
          <View style={{ flexDirection: "row" }} key={data.category}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={{ uri: data.files }} />
            </View>
            <Text
              style={{ marginLeft: 20, marginTop: 30, fontSize: 20 }}
              onPress={() => onItemSelected1(data.category)}
            >
              {data.category}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired
};
