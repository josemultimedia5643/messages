import React, { useState, useEffect, useReducer } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Dimensions
} from "react-native";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

import db from "../db";

import * as ImagePicker from "expo-image-picker";
import { setConfigurationAsync } from "expo/build/AR";

import MapView, { Marker } from "react-native-maps";

export default function SettingsScreen() {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(null);
  const [uri, setUri] = useState("");

  const handleSet = async () => {
    const snap = await db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();

    //console.log("message.from info", snap);
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

  const handleSave = async () => {
    // firebase.auth().currentUser.updateProfile({
    //   displayName,
    //   photoURL
    // });
    if (uri !== "") {
      const response = await fetch(uri);
      const blob = await response.blob();
      const putResult = await firebase
        .storage()
        .ref()
        .child(firebase.auth().currentUser.uid)
        .put(blob);
      //console.log("putResult", putResult);

      // - upload selected image to default bucket, naming with uid
      // - get url and set photoURL
      const url = await firebase
        .storage()
        .ref()
        .child(firebase.auth().currentUser.uid)
        .getDownloadURL();

      setPhotoURL(url);
    }

    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({ displayName, photoURL });
  };

  const handlePickImage = async () => {
    //show camera roll, allow user to select, photoURL
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log("image picker", result);

    if (!result.cancelled) {
      console.log("not cancelled", result.uri, "\n-------------------");
      setPhotoURL(result.uri);
      setUri(result.uri);
      //setPhotoURL(result.uri);
    }

    // - use firebase storage
  };

  return (
    <View style={styles.container}>
      <Text>NANI</Text>
      {photoURL !== "" && (
        <Image
          source={{
            uri: photoURL
          }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setDisplayName}
        placeholder="Display Name"
        value={displayName}
      />

      {/* <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setPhotoURL}
        placeholder="Photo URL"
        value={photoURL}
      /> */}

      <Button title="Pick Image" onPress={handlePickImage} />
      <Button title="Save" onPress={() => handleSave()} />
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          // latitude: 37.78825,
          // longitude: -122.4324,
          latitude: 25.36079,
          longitude: 51.480978,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          coordinate={{
            latitude: 25.36079,
            longitude: 51.480978,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        ></Marker>
      </MapView>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: "app.json"
};

const styles = StyleSheet.create({
  container: {},

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
