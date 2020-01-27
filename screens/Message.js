import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput
} from "react-native";
import db from "../db";

import { MonoText } from "../components/StyledText";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
export default ({ message, handleEdit }) => {
  const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     db.collection("users")
  //       .doc(message.from)
  //       .get();
  //   }, []);

  const handleUser = async () => {
    const user = await db
      .collection("users")
      .doc(message.from)
      .get();
    console.log("message.from info", user.data());
    setUser(user.data());
  };

  useEffect(() => {
    handleUser();
  }, []);

  const handleDelete = message => {
    db.collection("messages")
      .doc(message.id)
      .delete();
  };

  return (
    user && (
      <View>
        <Image
          source={{
            uri: user.photoURL
          }}
          style={{ height: 50, width: 50 }}
        />
        <Text>From: {message.from}</Text>
        <Text>To: {message.to}</Text>
        <Text>Text: {message.text}</Text>
        <Button title="Delete" onPress={() => handleDelete(message)} />
        <Button title="Edit" onPress={() => handleEdit(message)} />
      </View>
    )
  );
};
