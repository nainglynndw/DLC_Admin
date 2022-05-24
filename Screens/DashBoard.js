import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../API/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";

const layout = Dimensions.get("window");
console.log(layout.width);

const Item = (props) => {
  return (
    <View style={[styles.itemContainer, { backgroundColor: props.bgColor }]}>
      <Text style={styles.itemTitle}>{props.title}</Text>
      <Text style={styles.data}>{props.data}</Text>
      <TouchableOpacity style={styles.detailBtn} onPress={props.detailOnPress}>
        <Text style={styles.detailText}>See Details</Text>
      </TouchableOpacity>
      {props.btnOnPress && (
        <TouchableOpacity style={styles.addBtn} onPress={props.btnOnPress}>
          <MaterialCommunityIcons name="plus-thick" size={24} color="#145248" />
          <Text style={styles.btnTitle}>{props.btnTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const DashBoard = (props) => {
  const userData = props.route.params;
  const addUser = (type) => {
    props.navigation.navigate("RegisterScreen", type);
  };
  const studentCollection = collection(db, "student");
  const teacherCollection = collection(db, "teacher");
  const adminCollection = collection(db, "Admin");

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [admin, setAdmin] = useState([]);

  const getUsers = async () => {
    const queryStudents = query(
      studentCollection,
      orderBy("createdAt", "desc")
    );
    const queryTeacher = query(teacherCollection, orderBy("createdAt", "desc"));
    const queryAdmin = query(adminCollection, orderBy("createdAt", "desc"));
    const studentSnapshot = await getDocs(queryStudents);
    const teacherSnapsot = await getDocs(queryTeacher);
    const adminSnapshot = await getDocs(queryAdmin);
    const studentList = studentSnapshot.docs.map((doc) => doc.data());
    const teacherList = teacherSnapsot.docs.map((doc) => doc.data());
    const adminList = adminSnapshot.docs.map((doc) => doc.data());
    setStudents([...studentList]);
    setTeachers([...teacherList]);
    setAdmin([...adminList]);
  };

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header
        title="DashBoard"
        user={userData?.name}
        userOnPress={() => {
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Loading" }],
          });
        }}
      />
      <View style={styles.body}>
        <ScrollView
          horizontal={layout.width >= 1200 ? true : false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            width: layout.width,
          }}
        >
          <Item
            detailOnPress={() => {
              props.navigation.navigate("UserList", {
                data: admin,
                type: "Admin",
              });
            }}
            bgColor="#ffc60b"
            title="Admin"
            data={`Total Admins = ${admin.length}`}
            btnTitle="Add New Admin"
            btnOnPress={() => {
              addUser("Admin");
            }}
          />
          <Item
            detailOnPress={() => {
              props.navigation.navigate("UserList", {
                data: teachers,
                type: "teacher",
              });
            }}
            bgColor="#158ae9"
            title="Teacher"
            data={`Total Teachers = ${teachers.length}`}
            btnOnPress={() => {
              addUser("teacher");
            }}
            btnTitle="Add New Teacher"
          />
          <Item
            detailOnPress={() => {
              props.navigation.navigate("UserList", {
                data: students,
                type: "student",
              });
            }}
            bgColor="#ff6565"
            title="Student"
            data={`Total Students = ${students.length}`}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    flex: 1,
    paddingBottom: 10,
  },
  body: {
    flexDirection: layout.width >= 1200 ? "row" : "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    margin: 20,
    borderRadius: 1000,
    width: layout.width >= 1200 ? 300 : layout.width * 0.8,
    height: layout.width >= 1200 ? 300 : layout.width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  data: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0000008f",
    marginBottom: 20,
  },
  // data1: {
  //   fontSize: 12,
  //   fontWeight: "bold",
  //   color: "#0000008f",
  //   marginBottom: 5,
  // },
  detailBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "grey",
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: 10,
  },
  detailText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  addBtn: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 50,
  },
  btnTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10,
    color: "#145248",
  },
  // requestedTeacher: {
  //   alignSelf: "center",
  //   width: "30%",
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
