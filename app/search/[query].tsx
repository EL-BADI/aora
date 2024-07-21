import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VideoType } from "@/index";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";
import VidCard from "@/components/VidCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchPosts({ query: query as string }),
  });
  console.log({ posts });

  return (
    <SafeAreaView className=" bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: VideoType) => item.$id}
        renderItem={({ item }) => <VidCard vid={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className=" font-pmedium text-sm text-zinc-200">
              Search results
            </Text>
            <Text className=" text-2xl font-psemibold text-white">{query}</Text>

            <View className=" mt-6 mb-8">
              <SearchInput initQuery={query as string} />
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator
              animating={true}
              size={"large"}
              className=" mt-9"
            />
          ) : (
            <EmptyState
              title="No Videos Found"
              subTitle="No vids found for this search query"
            />
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
