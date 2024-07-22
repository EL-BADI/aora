import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser, getCurrentUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({ email: "", password: "", userName: "" });
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmiting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!form.email || !form.userName || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser({
        email: form.email,
        userName: form.userName,
        password: form.password,
      });

      if (!result) throw new Error("Can't create a user!");

      // set it to global state...

      getCurrentUser()
        .then((res) => {
          if (res) {
            console.log({ res });

            setIsLoggedIn(true);
            // @ts-ignore
            setUser(res);
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        })
        .catch((error) => console.log(error));

      router.replace("/Home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
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
            label="Sign Up"
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
