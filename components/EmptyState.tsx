import { images } from "@/constants";
import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) => {
  return (
    <View className=" justify-center items-center px-4">
      <Image source={images.empty} className="w-72 h-60" resizeMode="contain" />
      <Text className=" font-pmedium text-sm text-zinc-200">{subTitle}</Text>
      <Text className=" text-xl font-psemibold text-white text-center mt-2">
        {title}!
      </Text>

      <CustomButton
        label="Create video"
        handlePress={() => {
          router.push("/Create");
        }}
        containerClassName="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
