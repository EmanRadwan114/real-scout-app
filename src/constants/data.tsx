import {
  ICategories,
  IFeaturedCards,
  IProfileOptions,
} from "../utils/interfaces";
import icons from "./icons";
import images from "./images";

const { Calender, Wallet, Bell, Language, Person, Help, Friends } = icons;

export const cards = [
  {
    title: "Card 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.NewYork,
  },
  {
    title: "Card 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    category: "house",
    image: images.Japan,
  },
  {
    title: "Card 3",
    location: "Location 3",
    price: "$300",
    rating: 2,
    category: "flat",
    image: images.NewYork,
  },
  {
    title: "Card 4",
    location: "Location 4",
    price: "$400",
    rating: 5,
    category: "villa",
    image: images.Japan,
  },
];

export const featuredCards: IFeaturedCards[] = [
  {
    title: "Featured 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    image: images.NewYork,
    category: "houses",
  },
  {
    title: "Featured 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    image: images.Japan,
    category: "apartments",
  },
  {
    title: "Featured 3",
    location: "Location 3",
    price: "$150",
    rating: 4.5,
    image: images.NewYork,
    category: "duplexes",
  },
  {
    title: "Featured 4",
    location: "Location 4",
    price: "$250",
    rating: 3.2,
    image: images.Japan,
    category: "studios",
  },
];

export const categories: ICategories[] = [
  { title: "all", category: "all" },
  { title: "houses", category: "houses" },
  { title: "condos", category: "condos" },
  { title: "duplexes", category: "duplexes" },
  { title: "studios", category: "studios" },
  { title: "villas", category: "villas" },
  { title: "apartments", category: "apartments" },
  { title: "townhomes", category: "townhomes" },
  { title: "others", category: "others" },
];

export const options: IProfileOptions[] = [
  { title: "profile", icon: <Person />, isArrowShown: true },
  { title: "my booking", icon: <Calender />, isArrowShown: true },
  { title: "payments", icon: <Wallet />, isArrowShown: true },
  { title: "notifications", icon: <Bell />, isArrowShown: true },
  { title: "language", icon: <Language />, isArrowShown: true },
  { title: "invite friends", icon: <Friends />, isArrowShown: true },
  { title: "help center", icon: <Help />, isArrowShown: true },
];

export const facilities = [
  {
    title: "Laundry",
    icon: icons.Laundry,
  },
  {
    title: "Car Parking",
    icon: icons.Car,
  },
  {
    title: "Sports Center",
    icon: icons.Sports,
  },
  {
    title: "Cutlery",
    icon: icons.Restaurant,
  },
  {
    title: "Gym",
    icon: icons.Gym,
  },
  {
    title: "Swimming pool",
    icon: icons.Swimming,
  },
  {
    title: "Wifi",
    icon: icons.Wifi,
  },
  {
    title: "Pet Center",
    icon: icons.Dog,
  },
];

export const gallery = [
  {
    id: 1,
    image: images.NewYork,
  },
  {
    id: 2,
    image: images.Japan,
  },
  {
    id: 3,
    image: images.NewYork,
  },
  {
    id: 4,
    image: images.Japan,
  },
  {
    id: 5,
    image: images.NewYork,
  },
  {
    id: 6,
    image: images.Japan,
  },
];
