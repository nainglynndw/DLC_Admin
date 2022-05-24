import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import { db } from "../API/firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";

const Login = (props) => {
  const [userData, setUserData] = useState({ id: "", password: "" });
  const [loading, setloading] = useState(false);

  const login = async () => {
    setloading(true);
    const usersCollection = collection(db, "Admin");
    const q = query(usersCollection, where("id", "==", userData.id));
    const userSnapshot = await getDocs(q);
    const userList = userSnapshot.docs.map((doc) => doc.data());

    if (userList.length < 1) {
      alert("Login Error ! There is no such Admin");
      setloading(false);
      return;
    }

    if (userList.length > 1) {
      alert("Login Error ! Tech Team");
      setloading(false);
      return;
    }

    if (userList[0].password !== userData.password) {
      alert("Password Mismatch ! Try Again");
      setloading(false);
      return;
    }

    setloading(false);
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: "DashBoard",
          params: userData,
        },
      ],
    });

    return;
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/dlc_logo.png")}
      />
      <Text style={styles.title}>Admin ID</Text>
      <Input
        placeholder="Admin ID"
        onChangeText={(a) => {
          setUserData({ ...userData, id: a });
        }}
      />
      <Text style={styles.title}>Password</Text>
      <Input
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(a) => {
          setUserData({ ...userData, password: a });
        }}
      />
      <Button title="Login" onPress={login} />
      {loading && <Loading open={true} />}
    </View>
  );
};

export default Login;

const layout = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: layout.width >= 600 ? layout.width * 0.6 : layout.width * 0.9,
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 5,
    borderColor: "#0081b8",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    backgroundColor: "#2b2b2b5f",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: "5%",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
