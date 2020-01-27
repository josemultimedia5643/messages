import React, { useState, useEffect, useReducer } from "react";
import { StyleSheet, View, Text, TextInput, Button, Image } from "react-native";

import firebase from "firebase/app";
import "firebase/auth";

import db from "../db";

import * as ImagePicker from "expo-image-picker";

export default function SettingsScreen() {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(null);

  const handleSet = async () => {
    const snap = await db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();

    console.log("message.from info", snap);
    setDisplayName(snap.data().displayName);
    setPhotoURL(snap.data().photoURL);
  };

  const askPermission = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    setHasCameraRollPermission(status === "granted");
  };

  useEffect(() => {
    handleSet();
  }, []);

  const handleSave = () => {
    // firebase.auth().currentUser.updateProfile({
    //   displayName,
    //   photoURL
    // });
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({ displayName, photoURL });
  };

  const handlePickImage = () => {
    //show camera roll, allow user to select, photoURL
    // - use firebase storange
    // - upload selected image to default bucket, naming with uid
    // - get url and set photoURL
  };

  return (
    <View style={styles.container}>
      <Text>NANI</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setDisplayName}
        placeholder="Display Name"
        value={displayName}
      />

      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setPhotoURL}
        placeholder="Photo URL"
        value={photoURL}
      />

      <Image
        source={{
          uri: photoURL
        }}
        style={{ width: 200, height: 200 }}
      />

      <Button title="Pick Image" onPress={handlePickImage} />
      <Button title="Save" onPress={() => handleSave()} />
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: "app.json"
};

const styles = StyleSheet.create({
  container: {}
});
