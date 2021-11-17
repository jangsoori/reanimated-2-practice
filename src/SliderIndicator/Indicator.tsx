import React from "react";
import { View, StyleSheet } from "react-native";
import type Animated from "react-native-reanimated";

import { Dot } from "./Dot";

interface IndicatorProps {
  count: number;
  currentIndex: Animated.SharedValue<number>;
}

export const Indicator = ({ count, currentIndex }: IndicatorProps) => {
  const countArray = Array.from(Array(count).keys());

  return (
    <View style={styles.container}>
      {countArray.map((_, i) => {
        return (
          <>
            <Dot index={i} currentIndex={currentIndex} />
            {i !== countArray.length - 1 && <View style={{ width: 10 }} />}
          </>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
