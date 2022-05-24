import { StyleSheet, View, Image, Text } from "react-native";
import React, { useEffect } from "react";

const Loading = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }, 4000);
  }, []);

  return (
    <View style={styles.loading}>
      <Image
        source={require("../assets/animation/loading2.gif")}
        style={{
          width: 150,
          height: 150,
          backgroundColor: "#f1f1f1",
        }}
      />
      <Text style={styles.welcomeText}>
        Welcome to{" "}
        <Text style={styles.dlcText}> Digital Learning Center ! </Text>
      </Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "#0081b8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  dlcText: {
    color: "yellow",
  },
});
