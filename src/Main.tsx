import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, FlatList, Pressable, View } from "react-native";

import type { Routes } from "../Routes";

export const examples = [
  {
    screen: "Card Color Change",
    title: "🎨 Card Color Change",
  },
  {
    screen: "Reflectly",
    title: "Reflectly",
  },
  {
    screen: "Twitter",
    title: "Twitter",
  },
  {
    screen: "ExpandableHeader",
    title: "Expandable Header",
  },
  {
    screen: "YoutubePlayButton",
    title: "Youtube Play Button",
  },
  {
    screen: "SliderIndicator",
    title: "Slider Indicator",
  },
  {
    screen: "CardSwiper",
    title: "Tarot",
  },
  {
    screen: "CardList",
    title: "Card List",
  },
] as const;

type MainScreenNavigationProp = NativeStackNavigationProp<Routes, "Main">;

export const Main = () => {
  const { navigate } = useNavigation<MainScreenNavigationProp>();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item) => {
          return item.screen;
        }}
        data={examples}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.item}
              onPress={() => {
                return navigate(item.screen);
              }}
            >
              <Text style={styles.name}>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  name: {
    fontSize: 20,
  },
});
