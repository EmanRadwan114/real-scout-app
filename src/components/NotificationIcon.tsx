import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const NotificationIcon = () => {
  return (
    <View className="relative">
      <View className="absolute bg-primary w-2 h-2 rounded-full end-1.5 top-0.5 z-50"></View>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default NotificationIcon;
