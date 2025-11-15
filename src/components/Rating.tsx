import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, View } from "react-native";

interface IProps {
  rating: number;
  boxClassName?: string;
  txtClassName?: string;
  iconColor?: string;
  iconSize?: number;
}

const Rating = ({
  rating,
  iconSize = 14,
  boxClassName,
  iconColor = "#fda121",
  txtClassName,
}: IProps) => {
  return (
    <View className={`${boxClassName}`}>
      <AntDesign name="star" size={iconSize} color={iconColor} />
      <Text className={`${txtClassName}`}>{rating}</Text>
    </View>
  );
};

export default Rating;
