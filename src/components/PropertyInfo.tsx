import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { formatPrice } from "../utils/helperFns";
import { IPropertyData } from "../utils/interfaces";

interface IProps extends IPropertyData {
  boxClassName?: string;
  titleClassName?: string;
  locationClassName?: string;
  priceClassName?: string;
  heartColor?: string;
  heartSize?: number;
  onPress?: () => void;
}

const PropertyInfo = ({
  title,
  price,
  location,
  boxClassName,
  locationClassName,
  titleClassName,
  priceClassName,
  heartColor = "black",
  heartSize = 28,
  onPress,
}: IProps) => {
  return (
    <View className={`${boxClassName}`}>
      <TouchableOpacity onPress={onPress}>
        <Text className={`capitalize mb-1.5 ${titleClassName}`}>{title}</Text>
        <Text className={`capitalize mb-2 ${locationClassName}`}>
          {location}
        </Text>
      </TouchableOpacity>
      <View className="flex-row justify-between items-center w-full">
        <Text className={`capitalize ${priceClassName}`}>
          {formatPrice(price)} EGP
        </Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={heartSize} color={heartColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PropertyInfo;
