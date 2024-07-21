import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { VideoType } from "..";
import { icons } from "@/constants";

const VidCard = ({ vid }: { vid: VideoType }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className=" flex-col items-center px-4 mb-14">
      <View className=" flex-row gap-3 items-start">
        <View className=" justify-center items-center flex-row flex-1">
          <View className=" w-[46px] h-[46px] border rounded-lg border-secondary-100 items-center justify-center p-0.5">
            <Image
              source={{ uri: vid.creator.avatar }}
              className=" h-full w-full rounded-lg"
              resizeMode="contain"
            />
          </View>

          <View className=" justify-center flex-1 ml-3 gap-y-1 ">
            <Text
              className=" text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {vid.title}
            </Text>
            <Text
              className=" text-xs text-zinc-200 font-pregular"
              numberOfLines={1}
            >
              {vid.creator.username}
            </Text>
          </View>
        </View>
        <View className=" pt-2">
          <Image
            source={icons.menu}
            className=" w-5 h-5"
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <Text className=" text-white">Playing...</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
          }}
          className=" w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: vid.thembnail }}
            className=" w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className=" absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VidCard;
