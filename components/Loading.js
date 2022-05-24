import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Text,
} from "react-native";
import React from "react";
const layout = Dimensions.get("window");

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.canvas}>
        <ActivityIndicator animating={props.open} size="large" color="#000" />
        <Text style={styles.loadingText}>Loading ...</Text>
      </View>
    </View>
  );
};

export default React.memo(Loading);

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    height: layout.height,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  canvas: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "orange",
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
});
