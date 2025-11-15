import SiteIcons from "@/src/constants/icons";
import SiteImgs from "@/src/constants/images";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "../context/userContext";
import { login } from "../lib/appwrite";

const { Google } = SiteIcons;

const SignIn = () => {
  //———————————————————————————————— Declarations ————————————————————————————————
  const colorSchema = useColorScheme();
  const { isLoading, isLoggedIn, refetch } = useUserContext();

  //———————————————————————————————— Render Logic ————————————————————————————————
  if (isLoggedIn && !isLoading) return <Redirect href="/" />;

  //———————————————————————————————— Handlers ————————————————————————————————
  const handleLogin = async () => {
    const response = await login();

    if (response) refetch();
    else Alert.alert("Error", "Failed to Login");
  };

  //———————————————————————————————— View ————————————————————————————————
  return (
    <SafeAreaView className="h-full bg-white dark:bg-black">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={
            colorSchema === "dark"
              ? SiteImgs.OnBoardingDark
              : SiteImgs.OnBoarding
          }
          className="w-full h-4/6 rounded-md mb-5"
          resizeMode="contain"
        />
        <View className="px-5">
          <Text className="uppercase text-light text-center text-lg font-rubik">
            Welcome to Real Scout
          </Text>
          <Text className="text-4xl capitalize font-rubik-bold text-center my-4">
            Let’s get you closer to{" "}
            <Text className="text-primary">your ideal home</Text>
          </Text>
          <Text className="capitalize text-light text-center mb-3 text-lg font-rubik">
            Login to Real Scout with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white dark:bg-[#191a21] shadow-lg shadow-black dark:shadow-light py-3 rounded-full my-3"
          >
            <View className="flex-row gap-3 justify-center items-center">
              <Google width={20} height={20} />
              <Text className="text-center text-lg font-rubik-medium">
                Sign Up with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
