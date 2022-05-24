import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btn}>
      <Text style={[styles.btnText, { fontSize: props.size }]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  btn: {
    zIndex: 10,
    backgroundColor: "#0081b8",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginVertical: 10,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
