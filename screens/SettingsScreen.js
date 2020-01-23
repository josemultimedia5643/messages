import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import firebase from "firebase/app";
import "firebase/auth";

export default function SettingsScreen() {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleSet = async () => {
    const info = await db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();

    console.log("message.from info", info);
    setDisplayName(info.displayName);
    setPhotoURL(info.photoURL);
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
      .update({ displayName, photoURL });
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
