import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { VideoType } from "..";
import { useState } from "react";
import { icons } from "@/constants";
import { cn } from "@/lib/utils";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";

const ZoomIn = { 0: { scale: 0.9 }, 1: { scale: 1 } };
const ZoomOut = { 0: { scale: 1.1 }, 1: { scale: 0.9 } };

const TrendingItem = ({
  post,
  activeItem,
}: {
  post: VideoType;
  activeItem?: string;
}) => {
  const [play, setPlay] = useState(false);
  console.log(post.videoUrl);

  return (
    <Animatable.View
      // @ts-ignore
      animation={activeItem === post.$id ? ZoomIn : ZoomOut}
      duration={300}
      className={cn(`mr-5`)}
    >
      {play ? (
        <Video
          source={{ uri: post.videoUrl }}
          className="w-52 h-72 rounded-3xl mt-3 bg-white/102"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          onPlaybackStatusUpdate={({ isLoaded }) => {
            if (!isLoaded) {
              console.log("NOT loaded");
            } else {
              console.log("loaded");
            }
          }}
          shouldPlay
        />
      ) : (
        <TouchableOpacity
          className=" relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
          }}
        >
          <ImageBackground
            source={{ uri: post.thembnail }}
            className="w-52 h-72 my-5 rounded-3xl overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className=" absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: VideoType[] }) => {
  const [activeItem, setActiveItem] = useState(posts.at(1)?.$id);

  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.$id}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setActiveItem(viewableItems.at(0)?.key);
        }
      }}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      renderItem={({ item }) => (
        <TrendingItem post={item} activeItem={activeItem} />
      )}
      horizontal
    />
  );
};

export default Trending;
