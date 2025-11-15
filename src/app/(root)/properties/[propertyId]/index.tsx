import PropertyCategory from "@/src/components/PropertyCategory";
import PropertyMap from "@/src/components/PropertyMap";
import Rating from "@/src/components/Rating";
import { useAppwrite } from "@/src/hooks/useAppwrite";
import {
  fetchPropertyAgent,
  fetchPropertyById,
  fetchPropertyReviews,
} from "@/src/lib/appwrite";
import { formatPrice } from "@/src/utils/helperFns";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Models } from "react-native-appwrite";

const PropertyDetails = () => {
  //———————————————————————————————— hooks ————————————————————————————————
  const [currReviewIndx, setCurrReviewIndx] = useState(0);

  const { propertyId } = useLocalSearchParams() as {
    propertyId: string;
  };

  const { data: property } = useAppwrite<Models.DefaultRow, { id: string }>({
    fn: fetchPropertyById,
    params: { id: propertyId },
  });

  const { data: propertyReviews } = useAppwrite<
    Models.DefaultRow[],
    { id: string }
  >({
    fn: fetchPropertyReviews,
    params: { id: propertyId },
  });

  const dataRef = useRef<{ name: string; icon: ReactElement }[]>([
    { name: "", icon: <></> },
  ]);

  const { data: propertyAgent, refetch: refetchPropAgent } = useAppwrite<
    Models.DefaultRow,
    { agentId: string }
  >({
    fn: fetchPropertyAgent,
    params: { agentId: property?.agent },
  });

  useEffect(() => {
    dataRef.current = [
      {
        name: `${property?.rooms} rooms`,
        icon: <FontAwesome name="bed" size={24} color="#d67d24" />,
      },
      {
        name: `${property?.bathrooms} baths`,
        icon: <FontAwesome name="bathtub" size={24} color="#d67d24" />,
      },
      {
        name: `${property?.area} sqft`,
        icon: <Ionicons name="expand-outline" size={24} color="#d67d24" />,
      },
    ];

    refetchPropAgent({ agentId: property?.agent });
  }, [property]);

  //———————————————————————————————— review creation date calc ————————————————————————————————
  const reviewsCreationDate = useRef<
    { id: string; days: number; rowId: string }[]
  >([]);

  useEffect(() => {
    if (!propertyReviews) {
      reviewsCreationDate.current = [];
      return;
    }

    reviewsCreationDate.current = propertyReviews.map((review) => {
      const now = new Date().getTime();
      const created = new Date(review.$createdAt).getTime();

      const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));

      return {
        id: `${review.$id.slice(0, 7)}-${review.username}-${Math.random()}`,
        days: diffDays,
        rowId: review.$id,
      };
    });
  }, [propertyReviews]);

  //———————————————————————————————— constants ————————————————————————————————
  const { width } = Dimensions.get("screen");
  const IMG_WIDTH = width / 2.5;
  const MAP_GAP = 16 * 1.8;

  return (
    <FlatList
      data={[]}
      renderItem={({ item }) => <></>}
      showsVerticalScrollIndicator={false}
      className="bg-white dark:bg-black h-full"
      keyExtractor={(item, indx) => `${indx}`}
      ListHeaderComponent={
        <>
          {/*———————————————————————————————— header ————————————————————————————————*/}
          <View className="relative">
            <Image
              source={{ uri: property?.thumbnail_img }}
              className="w-100 h-80"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/30 py-12 px-6">
              <View className="flex-row justify-between items-center">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="bg-primary size-9 justify-center items-center rounded-full"
                >
                  <Feather name="arrow-left" size={20} color="white" />
                </TouchableOpacity>

                <View className="flex-row gap-x-3 items-center">
                  <Ionicons name="heart-outline" size={28} color="white" />
                  <Feather name="send" size={24} color="white" />
                </View>
              </View>
            </View>
          </View>

          {/*———————————————————————————————— Property Info ————————————————————————————————*/}
          <View className="p-5 mb-1">
            <Text className="font-rubik-semibold text-xl text-black dark:text-white">
              {property?.title}
            </Text>
            <View className="flex-row gap-x-2 items-center my-5">
              <PropertyCategory
                categoryName={property?.category}
                boxClassName="rounded-full bg-primary px-3 py-0.5"
                categoryClassName="text-white"
              />
              <Rating
                rating={property?.rating}
                txtClassName="font-rubik-medium text-zinc-600"
                boxClassName="rounded-full bg-primary/15 flex-row items-center gap-x-1 px-3"
                iconSize={12}
              />
              <Text className="text-light font-rubik-medium">
                {propertyReviews?.length} reviews
              </Text>
            </View>
            <View className="flex-row gap-4">
              {dataRef.current.map((item) => (
                <View key={item.name} className="flex-row items-center gap-x-2">
                  <View className="bg-primary/15 size-12 justify-center items-center rounded-full">
                    {item.icon}
                  </View>
                  <Text className="font-rubik-medium capitalize">
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            <Text className="text-xl text-primary font-rubik-semibold mt-4">
              {formatPrice(property?.price)} EGP
            </Text>
          </View>

          {/*———————————————————————————————— agent data ————————————————————————————————*/}
          <View className="px-4 mb-6">
            <Text className="text-xl font-rubik-medium mb-4 capitalize">
              Agent
            </Text>
            <View className="flex-row items-start justify-between">
              <View className="flex-row gap-x-5 items-center ">
                <Image
                  source={{ uri: propertyAgent?.avatar }}
                  className="size-16 rounded-full"
                />
                <View>
                  <Text className="capitalize text-lg font-rubik-medium mb-0.5">
                    {propertyAgent?.fullname}
                  </Text>
                  <Text className="text-light capitalize font-rubik-medium">
                    {propertyAgent?.role}
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-x-6 items-center">
                <TouchableOpacity>
                  <AntDesign name="message" size={26} color="#d67d24" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="phone-call" size={26} color="#d67d24" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*———————————————————————————————— overview ————————————————————————————————*/}
          <View className="px-4 mb-4">
            <Text className="text-xl font-rubik-medium mb-2 capitalize">
              overview
            </Text>
            <Text className="text-light text-lg">{property?.description}</Text>
          </View>

          {/*———————————————————————————————— facilities ————————————————————————————————*/}
          <View className="px-4 mb-5">
            <Text className="text-xl font-rubik-medium capitalize mb-4">
              facilities
            </Text>
            <View className="flex-row gap-6 flex-wrap">
              {property?.facilities.map((item: string) => (
                <View key={item} className="items-center">
                  <View className="bg-primary/15 size-12 items-center justify-center rounded-full">
                    {item === "wifi" && (
                      <Feather name="wifi" size={24} color="#d67d24" />
                    )}
                    {item === "parking" && (
                      <FontAwesome5 name="car-alt" size={24} color="#d67d24" />
                    )}
                    {item === "pet-friendly" && (
                      <MaterialIcons name="pets" size={24} color="#d67d24" />
                    )}
                    {item === "pool" && (
                      <FontAwesome6
                        name="person-swimming"
                        size={24}
                        color="#d67d24"
                      />
                    )}
                    {item === "restaurant" && (
                      <MaterialIcons
                        name="restaurant"
                        size={24}
                        color="#d67d24"
                      />
                    )}
                    {item === "laundary" && (
                      <MaterialIcons
                        name="local-laundry-service"
                        size={24}
                        color="#d67d24"
                      />
                    )}
                  </View>
                  <Text className="capitalize mt-2">
                    {item === "wifi" && "Wifi"}
                    {item === "parking" && "Car parking"}
                    {item === "pet-friendly" && "pet friendly"}
                    {item === "pool" && "swimming pool"}
                    {item === "restaurant" && "restaurant"}
                    {item === "laundary" && "laundary"}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/*———————————————————————————————— gallery ————————————————————————————————*/}
          <View className="px-4">
            <Text className="text-xl font-rubik-medium capitalize mb-4">
              gallery
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={property?.gallery_images ?? []}
            keyExtractor={(item) => item}
            bounces={false}
            contentContainerClassName="px-4 mb-5 gap-x-3"
            renderItem={({ item }) => (
              <View>
                <View className="flex-row">
                  <Pressable key={item}>
                    <Image
                      source={{ uri: item }}
                      className={`h-40 rounded-lg`}
                      style={{ width: IMG_WIDTH }}
                    />
                  </Pressable>
                </View>
              </View>
            )}
          ></FlatList>

          {/*———————————————————————————————— location ————————————————————————————————*/}
          <View className="px-4 mb-5">
            <Text className="text-xl font-rubik-medium capitalize mb-2">
              location
            </Text>
            <View className="font-rubik-medium capitalize mb-4 text-light text-lg flex-row gap-x-1 items-center">
              <Entypo name="location-pin" size={18} color="#d67d24" />
              <Text className="font-rubik-medium capitalize text-light text-lg">
                {property?.location}
              </Text>
            </View>
            <PropertyMap
              latitude={parseFloat(property?.geolocation.split(",")[0])}
              longitude={parseFloat(property?.geolocation.split(",")[1])}
              width={width - MAP_GAP}
            />
          </View>
          {console.log(parseFloat(property?.geolocation.split(",")[0]))}

          {/*———————————————————————————————— reviews ————————————————————————————————*/}
          <View className="px-4 mb-3">
            <Text className="text-xl font-rubik-medium capitalize mb-3">
              reviews
            </Text>
          </View>
          <FlatList
            data={propertyReviews ?? []}
            className="flex-1"
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.$id}
            pagingEnabled
            bounces={false}
            onViewableItemsChanged={({ viewableItems }) =>
              viewableItems.length > 0 &&
              setCurrReviewIndx(viewableItems[0].index!)
            }
            scrollEventThrottle={12}
            ListEmptyComponent={() => (
              <View
                className="flex-1 items-center justify-center mb-3"
                style={{ width }}
              >
                <Text className="text-primary font-rubik-medium text-center text-lg">
                  No Reviews Found
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <View style={{ width }} className="px-4">
                <View className="flex-row gap-x-3 items-center mb-4">
                  <Image
                    source={{ uri: item?.avatar }}
                    className="size-16 rounded-full"
                  />
                  <View>
                    <Text className="font-rubik-medium capitalize text-lg">
                      {item?.username}
                    </Text>
                    {reviewsCreationDate.current.map((review) =>
                      review.rowId === item.$id ? (
                        <Text className="text-light font-rubik" key={review.id}>
                          {review.days === 0
                            ? `today`
                            : review.days === 1
                              ? `1 day ago`
                              : `${review.days} days ago`}
                        </Text>
                      ) : null
                    )}
                  </View>
                </View>
                <Text className="text-light font-rubik text-wrap">
                  {item?.review}
                </Text>
                <View className="flex-row justify-center gap-x-2 mt-3">
                  {reviewsCreationDate.current.map((item, index) => (
                    <View
                      key={`${item.id}-${index}`}
                      className={`rounded-full`}
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor:
                          index === currReviewIndx ? "#71717a" : "#d4d4d8",
                      }}
                    />
                  ))}
                </View>
              </View>
            )}
          ></FlatList>

          {/*———————————————————————————————— book ————————————————————————————————*/}
          <TouchableOpacity
            className="bg-primary rounded-full py-3 mx-10 mb-16 mt-5"
            onPress={() => {
              Alert.alert("Success", "Property Booked Successfully!");
            }}
          >
            <Text className="text-xl font-rubik-medium text-white text-center capitalize">
              book
            </Text>
          </TouchableOpacity>
        </>
      }
    ></FlatList>
  );
};

export default PropertyDetails;
