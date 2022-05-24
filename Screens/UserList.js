import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { db } from "../API/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore/lite";
import Loading from "../components/Loading";

const layout = Dimensions.get("window");

const UserList = (props) => {
  const { data, type } = props.route.params;
  const [user, setUser] = useState(data);
  const [loading, setloading] = useState(false);
  const usersCollection = collection(db, type);
  const [selectedUser, setSelectedUser] = useState();

  const renderItem = ({ item, index }) => {
    const bgColor = item.id === selectedUser?.id ? "#2d42e08f" : "#c6eb348f";
    const borderColor = item.id === selectedUser?.id ? "#2d42e0" : "#c6eb34";
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          { backgroundColor: bgColor, borderColor: borderColor },
        ]}
        onPress={() => {
          setSelectedUser(item);
        }}
      >
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const UserData = (props) => {
    return (
      <View style={styles.userDataContainer}>
        <Text>
          {props.title} <Text style={styles.data}>{props.data}</Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        onPress={() => {
          props.navigation.goBack();
        }}
        title={` ${type.charAt(0).toUpperCase() + type.slice(1)}s  List`}
      />
      <View style={styles.body}>
        <View style={styles.half}>
          <FlatList
            data={user}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.half}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedUser?.name && (
              <UserData data={selectedUser.name} title="Name - " />
            )}
            {selectedUser?.gender && (
              <UserData data={selectedUser.gender} title="Gender - " />
            )}
            {selectedUser?.id && (
              <UserData data={selectedUser.id} title={`${type} ID - `} />
            )}
            {selectedUser?.teacherId && (
              <UserData data={selectedUser.teacherId} title="ID - " />
            )}
            {selectedUser?.activated?.toString() && (
              <UserData
                data={selectedUser.activated.toString()}
                title="Activited - "
              />
            )}
            {selectedUser?.email && (
              <UserData data={selectedUser.email} title="Email - " />
            )}
            {selectedUser?.phone?.toString() && (
              <UserData data={selectedUser.phone} title="Phone - " />
            )}
            {selectedUser?.class && (
              <UserData data={selectedUser.class} title="Class - " />
            )}
            {selectedUser?.address && (
              <UserData data={selectedUser.address} title="Address - " />
            )}
            {selectedUser?.dateOfBirth && (
              <UserData
                data={selectedUser.dateOfBirth.toDate().toDateString()}
                title="Date Of Birth - "
              />
            )}
            {selectedUser?.createdAt && (
              <UserData
                data={selectedUser.createdAt.toDate().toDateString()}
                title="Created Date - "
              />
            )}
            {selectedUser?.password && (
              <UserData data={selectedUser.password} title="Password - " />
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    flex: 1,
  },
  body: {
    width: "100%",
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  half: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    width: "60%",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  userDataContainer: {
    backgroundColor: "#2d42e08f",
    borderWidth: 1,
    borderColor: "#2d42e0",
    padding: 20,
    marginBottom: 5,
  },
  data: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
