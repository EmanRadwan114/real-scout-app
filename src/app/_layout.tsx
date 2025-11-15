import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import UserContextProvider from "../context/userContext";
import "../global.css";

// Prevent the splash screen from auto-hiding before fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isFontsLoaded] = useFonts({
    "Rubik-Bold": require("@/src/assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("@/src/assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("@/src/assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("@/src/assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("@/src/assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("@/src/assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (isFontsLoaded) SplashScreen.hide();
  }, [isFontsLoaded]);

  if (!isFontsLoaded) return null; // Keep splash visible while loading fonts

  return (
    <UserContextProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserContextProvider>
  );
}
