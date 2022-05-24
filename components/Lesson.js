import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Lesson = (props) => {
  return (
    <TouchableOpacity style={styles.btnHeart} onPress={props.onPress}>
      <Text style={[styles.btnTitle]}>{props.type}</Text>
      <LottieView
        resizeMode="cover"
        autoPlay={true}
        loop
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          margin: 10,
        }}
        // colorFilters={[
        //   {
        //     keypath: "Layer 1",
        //     color: getRandomColor(),
        //   },
        // ]}
        source={props.anim}
      />
      <Text style={styles.btnText}>
        {props.name} - ({props.sub})
      </Text>
    </TouchableOpacity>
  );
};
export default React.memo(Lesson);

const styles = StyleSheet.create({
  btnHeart: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#ffffff",
    elevation: 8,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  btnText: {
    marginTop: 5,
    padding: 5,
    width: "100%",
    backgroundColor: "#7389ab5f",
    fontWeight: "bold",
    fontSize: 12,
    color: "#1e8264",
    textAlignVertical: "center",
    textAlign: "center",
  },
  btnTitle: {
    borderRadius: 10,
    padding: 5,
    width: "100%",
    backgroundColor: "#8262bc5f",
    fontWeight: "bold",
    fontSize: 14,
    color: "#781d2caf",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
