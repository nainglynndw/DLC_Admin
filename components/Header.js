import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = (props) => {
  return (
    <View style={styles.container}>
      {props.onPress ? (
        <MaterialCommunityIcons
          name="arrow-left-bold"
          size={24}
          color="#eee"
          onPress={props.onPress}
        />
      ) : (
        <TouchableOpacity onPress={props.userOnPress}>
          <Text style={styles.user}>{props.user} </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{props.title}</Text>
      <Image
        resizeMode="contain"
        source={require("../assets/images/dlc_logo.png")}
        style={styles.logo}
      />
    </View>
  );
};

export default React.memo(Header);

const layout = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#145248",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  user: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2196f3",
  },
  logo: {
    width: 50,
    height: 50,
  },
});
