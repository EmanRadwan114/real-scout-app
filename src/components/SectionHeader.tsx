import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IProps {
  onPress?: () => void;
  title: string;
}

const SectionHeader = ({ onPress, title }: IProps) => {
  return (
    <View className="flex-row justify-between items-center my-5">
      <Text className="font-rubik-semibold text-xl capitalize">{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text className="text-xl text-primary font-rubik-semibold capitalize">
          See All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;
