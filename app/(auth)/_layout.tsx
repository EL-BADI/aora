import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" />
        <Stack.Screen name="SignUp" />
      </Stack>
      <StatusBar backgroundColor={"#000000"} style="light" />
    </>
  );
};

export default AuthLayout;
