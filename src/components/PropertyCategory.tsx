import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TFilters } from "../utils/types";

interface IProps {
  categoryName: TFilters;
  boxClassName?: string;
  categoryClassName?: string;
}

const PropertyCategory = ({
  categoryName,
  categoryClassName,
  boxClassName,
}: IProps) => {
  return (
    <View className={`${boxClassName}`}>
      <Text
        className={`${categoryClassName} font-rubik-semibold capitalize text-lg text-white`}
      >
        {categoryName}
      </Text>
    </View>
  );
};

export default PropertyCategory;

const styles = StyleSheet.create({});
