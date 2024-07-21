import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { icons } from "@/constants";

type SearchInputProps = {
  label?: string;
  value?: string;
  handleChangeText?: (text: string) => void;
  containerClassName?: string;
  keyboardType?: KeyboardTypeOptions;
};

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  value,
  handleChangeText,
  containerClassName,
  keyboardType,
}) => {
  return (
    <View className="w-full h-16 px-4 bg-zinc-900 border-2 border-zinc-700 rounded-2xl flex-row focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white font-pregular w-full text-base mt-0.5"
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
        value={value}
        keyboardType={keyboardType}
      />
      <TouchableOpacity>
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
