import React from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const screenWidth = Dimensions.get("window").width;

interface IProps {
  latitude: number;
  longitude: number;
  width?: number;
}

export default function PropertyMap({
  latitude,
  longitude,
  width = screenWidth / 2,
}: IProps) {
  if (!latitude || !longitude) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#d67d24" />
      </View>
    );
  }

  return (
    <View style={{ width }}>
      <MapView
        style={{ height: 200 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
}
