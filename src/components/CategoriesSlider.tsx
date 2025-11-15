import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { categories } from "../constants/data";
import CategoryItem from "./CategoryItem";
import { TFilters } from "../utils/types";

const CategoriesSlider = () => {
  const params = useLocalSearchParams<{ filteredCateg: TFilters }>();
  const [selectedCategory, setSelectedCategory] = useState<TFilters>(
    params.filteredCateg || "all"
  );

  const handleSelectedCategory = (categ: TFilters) => {
    setSelectedCategory(categ);
    router.setParams({ filter: categ });
  };

  return (
    <>
      {categories.map((categ) => (
        <CategoryItem
          category={categ.title}
          key={categ.title}
          onPress={() => handleSelectedCategory(categ.title)}
          selectedCategory={selectedCategory}
        />
      ))}
    </>
  );
};

export default CategoriesSlider;
