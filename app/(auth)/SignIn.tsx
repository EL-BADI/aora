import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SingIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const [isSubmiting, setIsSubmtting] = useState();

  const onSubmit = () => {};
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "101%" }}>
        <View className="w-full justify-center items-center min-h-[90vh]  px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-9"
          />
          <Text className=" text-2xl text-white font-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            label="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            containerClassName="mt-7"
            keyboardType="email-address"
          />
          <FormField
            label="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            containerClassName="mt-7"
          />
          <CustomButton
            isLoading={isSubmiting}
            label="Sign In"
            containerClassName=" mt-7"
            handlePress={onSubmit}
          />
          <View className=" justify-center pt-7 flex-row gap-2">
            <Text className=" text-lg text-zinc-100">Don't have account?</Text>
            <Link
              href={"/SignUp"}
              className=" text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingIn;
