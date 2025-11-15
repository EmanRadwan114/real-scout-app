import React from "react";
import { Image, View } from "react-native";
import { Models } from "react-native-appwrite";
import PropertyCategory from "./PropertyCategory";
import PropertyInfo from "./PropertyInfo";
import Rating from "./Rating";

interface IProps {
  card: Models.DefaultRow;
  onPress?: () => void;
}

const FeaturedCard = ({ card, onPress }: IProps) => {
  return (
    <View className="overflow-hidden w-72 relative rounded-3xl">
      <Image
        source={{ uri: card?.thumbnail_img }}
        resizeMode="cover"
        className="w-full h-96"
      />
      <View className="bg-black/50 absolute inset-0">
        <View className="relative w-full flex-1">
          <PropertyCategory
            categoryName={card.category}
            boxClassName="rounded-full bg-primary absolute px-3 py-0.5 start-4 top-6"
            categoryClassName="text-white text-sm"
          />
          <Rating
            rating={card.rating}
            txtClassName="font-rubik-medium text-blue-500 text-sm"
            boxClassName="rounded-full bg-white flex-row items-center gap-x-1 absolute px-3 end-6 top-6"
            iconSize={12}
          />

          <PropertyInfo
            {...card}
            title={card.title}
            location={card.location}
            price={card.price}
            key={card.$id}
            boxClassName="absolute start-5 end-5 bottom-5"
            titleClassName="font-rubik-bold text-xl text-white"
            locationClassName="font-rubik text-white"
            priceClassName="font-rubik-bold text-xl text-white"
            heartColor="white"
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};

export default FeaturedCard;
