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
  const [from, setFrom] = useState(null);

  //   useEffect(() => {
  //     db.collection("users")
  //       .doc(message.from)
  //       .get();
  //   }, []);

  const handleSet = async () => {
    const info = await db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get(snapShot => {
        console.log("message.from info", info);
      });
  };

  useEffect(() => {
    handleSet();
  }, []);

  const handleDelete = message => {
    db.collection("messages")
      .doc(message.id)
      .delete();
  };

  return (
    <>
      <Text>From: {message.from}</Text>
      <Text>To: {message.to}</Text>
      <Text>Text: {message.text}</Text>
      <Button title="Delete" onPress={() => handleDelete(message)} />
      <Button title="Edit" onPress={() => handleEdit(message)} />
    </>
  );
};
