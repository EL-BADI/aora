import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";

import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { createPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
export type formDataProps = {
  title: string;
  video: ImagePicker.ImagePickerAsset | null;
  thembnail: ImagePicker.ImagePickerAsset | null;
  prompt: string;
};
const Create = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState<formDataProps>({
    title: "",
    video: null,
    thembnail: null,
    prompt: "",
  });

  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["uploadPost"],
    mutationFn: createPost,
  });

  const openPicker = async (selectType: "video" | "image") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thembnail: result.assets[0] });
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (
      !form.title ||
      !form.prompt ||
      !form.thembnail ||
      !form.video ||
      !user?.$id
    )
      return Alert.alert("Missing data", "Please fill in all the fields!");

    try {
      await mutateAsync({ form, userId: user?.$id });

      setForm({ title: "", video: null, thembnail: null, prompt: "" });
      Alert.alert("Success", "Post uploaded successfully!");
      router.push("/Home");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    }
  };
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView className=" px-4  h-full">
        <Text className=" text-2xl mt-5 text-white font-psemibold">
          Upload video
        </Text>
        <FormField
          label="Video title"
          value={form.title}
          placeholder="Give your video a catch title"
          handleChangeText={(e) => {
            setForm({ ...form, title: e });
          }}
          containerClassName="mt-10"
        />
        <View className=" mt-7 space-y-2">
          <Text className=" text-base text-zinc-200 font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className=" w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className=" w-full h-40 px-4 bg-zinc-900 rounded-2xl justify-center items-center">
                <View className=" w-14 h-14 border border-dashed border-zinc-500 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className=" w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className=" mt-7 space-y-2">
          <Text className=" text-base text-zinc-200 font-pmedium">
            Thumbnail image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thembnail ? (
              <Image
                source={{ uri: form.thembnail.uri }}
                resizeMode="cover"
                className=" h-64 w-full rounded-2xl"
              />
            ) : (
              <View className=" w-full h-16 border-2 border-black-200 px-4 bg-zinc-900 rounded-2xl justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className=" w-5 h-5"
                />
                <Text className=" text-zinc-300 text-sm font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          label="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => {
            setForm({ ...form, prompt: e });
          }}
          containerClassName="mt-7"
        />
        <CustomButton
          label="Submit & Publish"
          handlePress={submit}
          containerClassName="my-7"
          isLoading={isPending}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
