import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({ email: "", password: "", userName: "" });

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
            Sign Up to Aora
          </Text>
          <FormField
            label="User name"
            value={form.userName}
            handleChangeText={(e) => {
              setForm({ ...form, userName: e });
            }}
            containerClassName="mt-10"
          />
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
            <Text className=" text-lg text-zinc-100">
              Have an account already?
            </Text>
            <Link
              href={"/SignUp"}
              className=" text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
