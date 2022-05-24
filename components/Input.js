import { StyleSheet, TextInput } from "react-native";
import React from "react";

const Input = (props) => {
  return (
    <TextInput
      value={props.value}
      keyboardType={props.keyboardType}
      secureTextEntry={props.secureTextEntry}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      style={styles.input}
      onPressIn={props.onPressIn}
      editable={props.editable}
    />
  );
};

export default React.memo(Input);

const styles = StyleSheet.create({
  input: {
    width: "90%",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    elevation: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    fontWeight: "bold",
    color: "#0046b88f",
    marginVertical: 10,
    marginBottom: 20,
  },
});
