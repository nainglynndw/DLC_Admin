import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import { db } from "../API/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore/lite";
import Header from "../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegisterScreen = (props) => {
  const type = props.route.params;
  const [userData, setUserData] = useState({
    address: "",
    class: "",
    dateOfBirth: new Date("2021-12-31"),
    email: "",
    phone: "",
    name: "",
    id: "",
    password: "",
    createdAt: Timestamp.now(),
    activated: true,
  });
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const register = async () => {
    const usersCollection = collection(db, type);
    const q = query(usersCollection, where("id", "==", userData.id));
    const userSnapshot = await getDocs(q);
    const userList = userSnapshot.docs.map((doc) => doc.data());

    if (userData.name.replace(/\s/g, "").length <= 3)
      return alert("Error ! \nName must be atleast 4 characters .");
    if (userData.id.replace(/\s/g, "").length <= 3)
      return alert("Error ! \nID must be at least 4 characters .");
    if (userList.length !== 0) return alert("Error ! \nUser ID already exists");
    if (userData.password.length <= 5)
      return alert("Error ! \nPassword must be atleast 6 characters .");
    if (type !== "Admin") {
      if (userData.class.replace(/\s/g, "").length <= 3)
        return alert("Error ! \nClass Name must be at least 4 characters .");
      if (userData.address.replace(/\s/g, "").length <= 3)
        return alert("Error ! \nAddress must be at least 4 characters .");
      if (userData.dateOfBirth.getTime() === 1640908800000)
        return alert("Error ! \nDate Of Birth is Not Changed .");
      if (userData.phone.replace(/\s/g, "").length <= 8)
        return alert("Error ! \nPhone must be atleast 9 characters .");
      if (
        !userData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      )
        return alert("Invalid Email");
    }
    {
      setloading(true);
      addAccount();
      return;
    }
  };

  const addAccount = async () => {
    await setDoc(doc(db, type, userData.id), userData, {
      merge: false,
    });
    setloading(false);
    setShowModal(true);
  };

  const Modal = () => {
    return (
      <View style={styles.modal}>
        <Text style={styles.complete}>Complete Adding Student !</Text>
        <Text
          style={styles.ok}
          onPress={() => {
            setShowModal(false);
            props.navigation.navigate("DashBoard");
          }}
        >
          OK
        </Text>
      </View>
    );
  };

  return (
    <View style={{ width: layout.width, flex: 1 }}>
      <Header
        onPress={() => {
          props.navigation.goBack();
        }}
        title={` Register ${
          type.charAt(0).toUpperCase() + type.slice(1)
        } Account`}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Name</Text>
          <Input
            placeholder="Name"
            onChangeText={(a) => {
              setUserData({ ...userData, name: a });
            }}
          />
          <Text style={styles.title}>{`${type} ID`}</Text>
          <Input
            placeholder={`${type} ID`}
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
          {type !== "Admin" && (
            <>
              <Text style={styles.title}>Email</Text>
              <Input
                placeholder="Email"
                onChangeText={(a) => {
                  setUserData({ ...userData, email: a });
                }}
              />
              <Text style={styles.title}>Phone</Text>
              <Input
                placeholder="Phone"
                onChangeText={(a) => {
                  setUserData({ ...userData, phone: a });
                }}
              />
              <Text style={styles.title}>Class</Text>
              <Input
                placeholder="Class"
                onChangeText={(a) => {
                  setUserData({ ...userData, class: a });
                }}
              />
              <Text style={styles.title}>Address</Text>
              <Input
                placeholder="Address"
                onChangeText={(a) => {
                  setUserData({ ...userData, address: a });
                }}
              />
              <Text style={styles.title}>Date Of Birth</Text>
              <View style={styles.input}>
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  selected={userData.dateOfBirth}
                  onChange={(date) =>
                    setUserData({
                      ...userData,
                      dateOfBirth: date,
                    })
                  }
                />
              </View>
            </>
          )}

          <Button title="Register" onPress={register} />

          {loading && <Loading open={true} />}
          {showModal && <Modal />}
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const layout = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: layout.width >= 600 ? layout.width * 0.6 : layout.width * 0.9,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#2b2b2b2b",
    padding: 20,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: "5%",
  },
  modal: {
    width: 300,
    height: 200,
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "black",
    borderRadius: 10,
    position: "absolute",
    alignItems: "center",
  },
  complete: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  ok: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0081b8",
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "green",
  },
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
