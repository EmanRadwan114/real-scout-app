import CategoriesSlider from "@/src/components/CategoriesSlider";
import NotFound from "@/src/components/NotFound";
import NotificationIcon from "@/src/components/NotificationIcon";
import PropertyCard from "@/src/components/PropertyCard";
import Search from "@/src/components/Search";
import { useAppwrite } from "@/src/hooks/useAppwrite";
import { fetchProperties } from "@/src/lib/appwrite";
import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    isLoading: propertiesIsLoading,
    refetch: refetchProperties,
  } = useAppwrite<
    Models.DefaultRow[],
    { query?: string; filter?: string; limit: number }
  >({
    fn: fetchProperties,
    params: { filter: params.filter, query: params.query, limit: 14 },
  });

  useEffect(() => {
    refetchProperties({
      filter: params.filter,
      query: params.query,
      limit: 14,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white dark:bg-black flex-1 py-4">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <PropertyCard
            card={item}
            key={item?.$id}
            onPress={() => router.navigate(`/properties/${item?.$id}`)}
          />
        )}
        keyExtractor={(item) => item?.$id}
        contentContainerClassName="gap-y-4 pb-6"
        columnWrapperClassName="px-5 gap-4 "
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          propertiesIsLoading ? (
            <ActivityIndicator size="large" className="text-primary mt-7" />
          ) : (
            <NotFound />
          )
        }
        ListHeaderComponent={
          <>
            {/*———————————————————————————————— Header ————————————————————————————————*/}
            <View className="flex-row justify-between items-center mb-6 px-5">
              {/*———————————————————————————————— user data ————————————————————————————————*/}
              <TouchableOpacity
                className="size-11 rounded-full justify-center items-center bg-primary/15"
                onPress={() => router.back()}
              >
                <Feather name="arrow-left" size={22} color="black" />
              </TouchableOpacity>
              <Text className="capitalize font-rubik-medium text-md">
                search for your ideal home
              </Text>
              <NotificationIcon />
            </View>
            {/*———————————————————————————————— Search ————————————————————————————————*/}
            <View className="px-5 mb-6">
              <Search />
            </View>

            {/*———————————————————————————————— Search Results ————————————————————————————————*/}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View className="flex-row gap-x-2 px-5 mb-5">
                <CategoriesSlider />
              </View>
            </ScrollView>
            <Text className="text-lg font-rubik-medium px-5 mb-1">
              Founded {properties?.length} Results
            </Text>
          </>
        }
      ></FlatList>
    </SafeAreaView>
  );
}
