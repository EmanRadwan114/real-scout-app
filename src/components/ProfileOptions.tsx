import Icons from "@/src/constants/icons";
import { Text, TouchableOpacity, View } from "react-native";
import { IProfileOptions } from "../utils/interfaces";

const { ChevronRight } = Icons;

const ProfileOptions = ({
  icon,
  title,
  isArrowShown = true,
  onPress,
}: IProfileOptions) => {
  return (
    <TouchableOpacity
      className="flex flex-row justify-between items-center"
      onPress={onPress}
    >
      <View className="flex flex-row gap-2.5 items-center justify-center">
        <Text className="size-5">{icon}</Text>
        <Text className="font-rubik-medium text-lg capitalize">{title}</Text>
      </View>
      {isArrowShown && <ChevronRight />}
    </TouchableOpacity>
  );
};

export default ProfileOptions;
