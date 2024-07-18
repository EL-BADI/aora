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

type FormFieldProps = {
  label: string;
  value: string;
  handleChangeText?: (text: string) => void;
  containerClassName: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  handleChangeText,
  containerClassName,
  keyboardType,
  placeholder,
}) => {
  const [showPassword, setShowPassowrd] = useState(false);
  return (
    <View className={cn("space-y-2 w-full", containerClassName)}>
      <Text className="text-base text-zinc-100 font-pmedium">{label}</Text>
      <View className="w-full h-16 px-4 bg-zinc-900 border-2 border-zinc-700 rounded-2xl flex-row focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold w-full"
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={label === "Password" && !showPassword}
        />

        {label === "Password" && (
          <TouchableOpacity onPress={() => setShowPassowrd(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className=" w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
