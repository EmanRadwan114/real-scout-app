import React from "react";
import { Image, Text, View } from "react-native";

import images from "@/src/constants/images";

const NotFound = () => {
  return (
    <View className="justify-center items-center">
      <Image source={images.NotFound} className="size-36 rounded-full mb-3" />
      <Text className="capitalize text-xl font-rubik-semibold text-primary">
        No Results Found
      </Text>
    </View>
  );
};

export default NotFound;
