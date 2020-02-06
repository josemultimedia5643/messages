import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import db from "../db";

import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const [locations, setLocations] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    db.collection("users").onSnapshot(querySnapshot => {
      let users = [];

      querySnapshot.forEach(doc => {
        //console.log("Map Screen doc", doc.id);
        users.push({ id: doc.id, ...doc.data() });
      });
      //console.log("Map Screen users", users);
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    //console.log("useEffect2", users);
  }, [users]);

  const handleLocation = () => {};

  return (
    <View>
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
            longitude: 51.480978
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421
          }}
        ></Marker>
        {/* {locations.map(location => (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
          ></Marker>
        ))} */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

export default MapScreen;
