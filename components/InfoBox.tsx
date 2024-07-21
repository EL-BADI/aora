import { View, Text } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

const InfoBox = ({
  title,
  titleClassName,
  containerClassName,
  subTitle,
}: {
  title: string;
  containerClassName?: string;
  titleClassName?: string;
  subTitle?: string;
}) => {
  return (
    <View className={cn(containerClassName)}>
      <Text
        className={cn("text-white text-center font-psemibold", titleClassName)}
      >
        {title}
      </Text>
      <Text className=" text-sm text-zinc-200 text-center font-pregular">
        {subTitle}
      </Text>
    </View>
  );
};

export default InfoBox;
