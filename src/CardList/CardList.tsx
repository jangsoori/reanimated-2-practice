import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";

import { Card } from "./Card";

const cards = [
  { color: "#C23B23" },
  { color: "#976ED7" },
  { color: "#F39A27" },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CardList = () => {
  const expanded = useSharedValue(false);
  return (
    <AnimatedPressable
      onPress={() => {
        expanded.value = !expanded.value;
      }}
      style={{ flex: 1 }}
    >
      {cards.map(({ color }, i) => {
        return <Card expanded={expanded} index={i} key={color} color={color} />;
      })}
    </AnimatedPressable>
  );
};
