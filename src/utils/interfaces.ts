import { ReactElement } from "react";
import { ImageSourcePropType } from "react-native";
import { TCategory, TFacilities, TFilters } from "./types";

export interface IProfileOptions {
  icon: ReactElement;
  title: string;
  isArrowShown?: boolean;
  onPress?: () => void;
}

export interface IPropertyData {
  title: string;
  location: string;
  price: string;
}

export interface IFeaturedCards extends IPropertyData {
  rating: number;
  image: ImageSourcePropType;
  category: TFilters;
}

export interface ICategories {
  title: TFilters;
  category: TFilters;
}

export interface IAgent {
  $id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  role: "owner" | "broker";
}

export interface IReview {
  $id: string;
  rating: number;
  username: string;
  avatar: string;
  review: string;
  property: IProperty;
}

export interface IProperty {
  $id: string;
  title: string;
  description: string;
  location: string;
  thumbnail_img: string;
  rooms: number;
  bathrooms: number;
  rating: number;
  category: TCategory;
  price: number;
  area: number;
  geolocation: string;
  agent: IAgent;
  reviews: IReview;
  facilities: TFacilities[];
  gallery_images: string[];
}
