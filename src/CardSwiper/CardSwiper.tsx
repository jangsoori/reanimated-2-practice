import React from "react";
import { View, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { Card } from "./Card";

const cards = [
  {
    source: require("../../assets/images/cards/death-min.png"),
  },
  {
    source: require("../../assets/images/cards/chariot-min.png"),
  },
  {
    source: require("../../assets/images/cards/high-priestess-min.png"),
  },
  {
    source: require("../../assets/images/cards/justice-min.png"),
  },
  {
    source: require("../../assets/images/cards/lover-min.png"),
  },
  {
    source: require("../../assets/images/cards/pendu-min.png"),
  },
  {
    source: require("../../assets/images/cards/tower-min.png"),
  },
  {
    source: require("../../assets/images/cards/strength-min.png"),
  },
];

export const assets = cards.map((card) => card.source);

export const CardSwiper = () => {
  const shuffle = useSharedValue(false);
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card shuffle={shuffle} card={card} key={index} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
