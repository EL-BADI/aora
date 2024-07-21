import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VideoType } from "@/index";

import EmptyState from "@/components/EmptyState";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";
import VidCard from "@/components/VidCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setIsLoggedIn, setUser } = useGlobalContext();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: () => getUserPosts({ userId: user?.$id as string }),
  });
  console.log({ posts });

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/SignIn");
  };

  return (
    <SafeAreaView className=" bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: VideoType) => item.$id}
        renderItem={({ item }) => <VidCard vid={item} />}
        ListHeaderComponent={() => (
          <View className=" w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className=" items-end w-full mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className=" w-6 h-6"
              ></Image>
            </TouchableOpacity>
            <View className=" w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className=" w-[90%] h-[90%] rounded-lg"
              />
            </View>

            <InfoBox
              title={user?.username as string}
              containerClassName="mt-5"
              titleClassName="text-lg"
            />

            <View className=" mt-5 flex-row">
              <InfoBox
                title={(posts?.length || 0) + ""}
                subTitle="Posts"
                containerClassName="mr-10"
                titleClassName="text-xl"
              />
              <InfoBox
                title={"1.2k"}
                subTitle="Followers"
                titleClassName="text-xl"
              />
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

export default Profile;
