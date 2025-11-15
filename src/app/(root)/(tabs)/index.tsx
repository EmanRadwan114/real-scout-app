import CategoriesSlider from "@/src/components/CategoriesSlider";
import FeaturedCard from "@/src/components/FeaturedCard";
import NotFound from "@/src/components/NotFound";
import NotificationIcon from "@/src/components/NotificationIcon";
import PropertyCard from "@/src/components/PropertyCard";
import SectionHeader from "@/src/components/SectionHeader";
import { useUserContext } from "@/src/context/userContext";
import { useAppwrite } from "@/src/hooks/useAppwrite";
import { fetchLatestProperties, fetchProperties } from "@/src/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useUserContext();

  const { data: latestProperties, isLoading: latestPropIsLoading } =
    useAppwrite<Models.DefaultRow[]>({
      fn: fetchLatestProperties,
    });

  const params = useLocalSearchParams<{ filter?: string }>();

  const {
    data: properties,
    isLoading: propertiesIsLoading,
    refetch: refetchProperties,
  } = useAppwrite<Models.DefaultRow[], { filter?: string; limit: number }>({
    fn: fetchProperties,
    params: { filter: params.filter, limit: 6 },
  });

  useEffect(() => {
    refetchProperties({ filter: params.filter, limit: 6 });
  }, [params.filter]);

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
        contentContainerClassName="gap-y-4 pb-10"
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
            <View className="flex-row justify-between items-center mb-2 px-5">
              {/*———————————————————————————————— user data ————————————————————————————————*/}
              <View className="flex-row gap-x-3">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-16 rounded-full"
                />
                <View>
                  <Text className="font-rubik capitalize text-light">
                    Good Morning
                  </Text>
                  <Text className="font-rubik-medium capitalize text-lg text-black dark:text-white">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <NotificationIcon />
            </View>
            {/*———————————————————————————————— Featured ————————————————————————————————*/}
            <View className="px-5">
              <SectionHeader title="Featured" />
            </View>

            <FlatList
              data={latestProperties}
              renderItem={({ item }) => (
                <FeaturedCard
                  card={item}
                  key={item?.$id}
                  onPress={() => router.navigate(`/properties/${item?.$id}`)}
                />
              )}
              keyExtractor={(item) => item?.$id}
              horizontal={true}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-x-5 px-5 mb-3"
              ListEmptyComponent={
                latestPropIsLoading ? (
                  <ActivityIndicator
                    size="large"
                    className="text-primary mt-7"
                  />
                ) : (
                  <NotFound />
                )
              }
            ></FlatList>

            {/*———————————————————————————————— Recommendation ————————————————————————————————*/}
            <View className="px-5">
              <SectionHeader title="our recommendation" />
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View className="flex-row gap-x-2 px-5 mb-3">
                <CategoriesSlider />
              </View>
            </ScrollView>
          </>
        }
      ></FlatList>
    </SafeAreaView>
  );
}
