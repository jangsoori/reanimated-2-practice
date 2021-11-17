import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { PickerItem } from "./PickerItem";

const { width } = Dimensions.get("screen");

interface PickerProps {
  disabled: boolean;
  handlePress: (a: string) => void;
}

const colors = ["#8d86c0", "#B97A95", "#F6AE99", "#87A8A4"];

const CIRCLE_SIZE = 40;
const BORDER_SIZE = CIRCLE_SIZE + 10;
const PADDING = 20;
const CONTAINER_WIDTH = width;
const CIRCLE_CONTAINER_WIDTH = CONTAINER_WIDTH / 8;
const MARGIN_RIGHT = 10;

const snapPoints = colors.map((_, i) => {
  return (
    i * MARGIN_RIGHT +
    i * CIRCLE_CONTAINER_WIDTH +
    20 +
    CIRCLE_CONTAINER_WIDTH / 2 -
    BORDER_SIZE / 2
  );
});

export const Picker = ({ disabled, handlePress }: PickerProps) => {
  const xPos = useSharedValue(snapPoints[0]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: xPos.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {colors.map((color, i) => {
        return (
          <PickerItem
            color={color}
            size={CIRCLE_SIZE}
            handlePress={() => {
              handlePress(color);
              xPos.value = withTiming(snapPoints[i], { duration: 300 });
            }}
            disabled={disabled}
            width={CIRCLE_CONTAINER_WIDTH}
          />
        );
      })}
      <Animated.View style={[styles.border, style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: 'center',
    // backgroundColor: 'red',
    alignItems: "center",
    width,
    marginTop: 50,
    paddingHorizontal: PADDING,
  },
  border: {
    position: "absolute",
    left: 0,
    width: BORDER_SIZE,
    height: BORDER_SIZE,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
});
