import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";
import PropertyCategory from "./PropertyCategory";
import PropertyInfo from "./PropertyInfo";
import Rating from "./Rating";

interface IProps {
  card: Models.DefaultRow;
  onPress?: () => void;
}

const PropertyCard = ({ card, onPress }: IProps) => {
  return (
    <View
      className={`flex-1 relative rounded-lg p-3 bg-white dark:bg-black overflow-hidden shadow-md shadow-light`}
    >
      <TouchableOpacity onPress={onPress}>
        <View className="relative">
          <Image
            source={{ uri: card?.thumbnail_img }}
            resizeMode="cover"
            className="w-full h-44 rounded-2xl"
          />
          <View className="absolute inset-0 bg-black/50"></View>
        </View>
      </TouchableOpacity>
      <View className="absolute inset-0 ">
        <View className="relative">
          <PropertyCategory
            categoryName={card.category}
            boxClassName="rounded-full bg-primary absolute px-2 py-0.5 start-5 top-6"
            categoryClassName="text-white text-xs"
          />
          <Rating
            rating={card.rating}
            txtClassName="font-rubik-medium text-blue-500 text-xs"
            boxClassName="rounded-full bg-white flex-row items-center gap-x-1 absolute px-2 end-5 top-6"
            iconSize={10}
          />
        </View>
      </View>
      <PropertyInfo
        {...card}
        title={card.title}
        location={card.location}
        price={card.price}
        key={card.$id}
        boxClassName="mt-3"
        titleClassName="font-rubik-semibold"
        locationClassName="font-rubik text-light text-xs"
        priceClassName="font-rubik-semibold text-primary"
        heartColor="#666876"
        heartSize={20}
        onPress={onPress}
      />
    </View>
  );
};

export default PropertyCard;
