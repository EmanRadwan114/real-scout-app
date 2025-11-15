import NotificationIcon from "@/src/components/NotificationIcon";
import ProfileOptions from "@/src/components/ProfileOptions";
import { options } from "@/src/constants/data";
import Icons from "@/src/constants/icons";
import { useUserContext } from "@/src/context/userContext";
import { logout } from "@/src/lib/appwrite";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { Logout } = Icons;

const Profile = () => {
  const { user, refetch } = useUserContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have logged out successfully");
      refetch();
    } else Alert.alert("Error", "Error occurred in logging out");
  };

  return (
    <SafeAreaView className="bg-white dark:bg-black h-full px-5 py-4">
      {/*———————————————————————————————— Header ————————————————————————————————*/}
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-rubik-semibold">Profile</Text>
        {/*———————————————————————————————— Bell ————————————————————————————————*/}
        <NotificationIcon />
      </View>
      {/*———————————————————————————————— Profile Data ————————————————————————————————*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*———————————————————————————————— Avatar ————————————————————————————————*/}
        <View className="justify-center items-center mt-5 mb-12">
          <View className="relative">
            <Image
              source={{
                uri: user?.avatar,
              }}
              className="size-40 mb-3 rounded-full "
            />
            <TouchableOpacity className="absolute z-50 right-2 bottom-3">
              <FontAwesome name="pencil-square" size={34} color="#d67d24" />
            </TouchableOpacity>
          </View>
          <Text className="capitalize font-rubik-semibold text-2xl">
            {user?.name}
          </Text>
        </View>

        {/*———————————————————————————————— Profile Options ————————————————————————————————*/}
        <View className="gap-y-5">
          {options.slice(0, 2).map((item) => (
            <ProfileOptions {...item} key={item.title} />
          ))}
        </View>
        <View className="h-[0.5px] bg-slate-300 my-5"></View>
        <View className="gap-y-5">
          {options.slice(2).map((item) => (
            <ProfileOptions {...item} key={item.title} />
          ))}
        </View>
        <View className="h-[0.5px] bg-slate-300 my-5"></View>
        <View>
          <ProfileOptions
            title="logout"
            icon={<Logout />}
            isArrowShown={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
