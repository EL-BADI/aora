import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initQuery }: { initQuery?: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initQuery || "");
  return (
    <View className="w-full h-16 px-4 bg-zinc-900 border-2 border-zinc-700 rounded-2xl flex-row focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white font-pregular w-full text-base mt-0.5"
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#cdcde0"}
        value={query}
        onChangeText={(e) => {
          setQuery(e);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query)
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className=" w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
