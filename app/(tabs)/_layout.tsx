import React from "react";
import { Tabs, Redirect } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className=" items-center justify-center gap-1.5">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className=" w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#925ed6",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#050505",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  focused={focused}
                  name="home"
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="BookMark"
          options={{
            title: "Bookmark",
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabIcon
                  icon={icons.bookmark}
                  color={color}
                  focused={focused}
                  name="Bookmark"
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="Create"
          options={{
            title: "create",
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabIcon
                  icon={icons.plus}
                  color={color}
                  focused={focused}
                  name="create"
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "profile",
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  focused={focused}
                  name="profile"
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
