import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  //———————————————————————————————— State ————————————————————————————————
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();

  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    () => params.query
  );

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchTerm(value);
    router.setParams({ query: value });
  }, 500);
  //———————————————————————————————— Handlers ————————————————————————————————
  const handleChangeTxt = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  //———————————————————————————————— View ————————————————————————————————
  return (
    <View className="flex-row justify-between items-center bg-zinc-50 rounded-md p-2">
      <View className="p-2 flex-row gap-x-2  items-center flex-1">
        <EvilIcons name="search" size={28} color="#666876" />
        <TextInput
          onChangeText={handleChangeTxt}
          placeholder="Search Something"
          placeholderTextColor={"#666876"}
          value={searchTerm}
          className="w-full"
        />
      </View>
      <TouchableOpacity>
        <Ionicons name="options-outline" size={24} color="#666876" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
