import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VideoType } from "@/index";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";
import VidCard from "@/components/VidCard";

const Home = () => {
  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allPostsHome"],
    queryFn: () => getAllPosts(),
  });
  const { data: latestPosts, isLoading: isLoadingLatest } = useQuery({
    queryKey: ["latestPostsHome"],
    queryFn: () => getLatestPosts(),
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // re call vids
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <SafeAreaView className=" bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: VideoType) => item.$id}
        renderItem={({ item }) => <VidCard vid={item} />}
        ListHeaderComponent={() => (
          <View className=" my-6 px-4 space-y-6">
            <View className=" justify-between items-start flex-row mb-6">
              <View>
                <Text className=" font-pmedium text-sm text-zinc-200">
                  Welcome Back
                </Text>
                <Text className=" text-2xl font-psemibold text-white">
                  El badi
                </Text>
              </View>
              <View className=" mt-1.5">
                <Image
                  source={images.logoSmall}
                  className=" w9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className=" w-full flex-1 pt-5 pb-8">
              <Text className=" text-zinc-200 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
