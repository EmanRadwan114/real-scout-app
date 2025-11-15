import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { TFilters } from "../utils/types";

interface IProps {
  category: TFilters;
  onPress: () => void;
  selectedCategory: TFilters;
}

const CategoryItem = ({ category, onPress, selectedCategory }: IProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full ${category === selectedCategory ? "bg-primary " : "bg-primary/15"}`}
    >
      <Text
        className={`${category === selectedCategory ? " text-white" : "font-rubik-medium"} capitalize font-rubik`}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
