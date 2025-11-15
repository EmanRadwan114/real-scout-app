import { useUserContext } from "@/src/context/userContext";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AppLayout = () => {
  const { isLoading, isLoggedIn } = useUserContext();

  if (isLoading)
    return (
      <SafeAreaView className="bg-white dark:bg-black h-full justify-center items-center">
        <ActivityIndicator className="text-primary" size={"large"} />
      </SafeAreaView>
    );

  if (!isLoggedIn) return <Redirect href={"/sign-in"} />;

  return <Slot />;
};

export default AppLayout;
