import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React, { ReactElement } from "react";
import { Text, useColorScheme, View } from "react-native";

interface IIcon {
  title: string;
  isFocused: boolean;
  icon: ReactElement;
}

const TabsIcon = ({ title, isFocused, icon }: IIcon) => {
  return (
    <View className={`flex-1 justify-center items-center`}>
      <Text className={`${isFocused ? "text-primary" : ""}`}>{icon}</Text>
      <Text
        className={`text-sm w-full mt-1 ${isFocused ? "text-primary font-rubik-medium" : "font-rubik"}`}
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 24,
        },
        tabBarStyle: {
          position: "fixed",
          bottom: 60,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 30,
          backgroundColor: colorScheme === "dark" ? "#191a21" : "#fff",
          shadowColor: "#191a21",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabsIcon
                title="Home"
                icon={<Octicons name="home" size={24} />}
                isFocused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabsIcon
                title="Explore"
                icon={<Feather name="search" size={24} />}
                isFocused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabsIcon
                title="Profile"
                icon={<FontAwesome6 name="user" size={24} />}
                isFocused={focused}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
