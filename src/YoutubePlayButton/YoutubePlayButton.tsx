import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { parse, interpolatePath } from "react-native-redash";

const left = parse(["M 0 0", "L 30 0", "L 30 100", "L 0 100"].join(" "));

const targetLeft = parse(["M 10 0", "L 50 25", "V 75", "L 10 100"].join(" "));

const right = parse(["M 70 0", "L 100 0", "L 100 100", "L 70 100"].join(" "));

const targetRight = parse(["M 50 25", "L 90 50", "V 50", "L 50 75"].join(" "));

const AnimatedPath = Animated.createAnimatedComponent(Path);

const TIMING_BG = 250;
const TIMING_BTN = 150;

export const YoutubePlayButton = () => {
  const progress = useSharedValue(0);
  const backgroundProgress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return { d: interpolatePath(progress.value, [0, 1], [left, targetLeft]) };
  });
  const animatedProps2 = useAnimatedProps(() => {
    return { d: interpolatePath(progress.value, [0, 1], [right, targetRight]) };
  });

  const animatedBgStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(backgroundProgress.value, [0, 1], [0, 0.2]),
    };
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => {
          backgroundProgress.value = withTiming(1, { duration: TIMING_BG });
        }}
        onPressOut={() => {
          backgroundProgress.value = withTiming(0, { duration: TIMING_BG });
        }}
        onPress={() => {
          progress.value = withDelay(
            100,
            withTiming(progress.value === 1 ? 0 : 1, { duration: TIMING_BTN })
          );
        }}
        style={styles.buttonContainer}
      >
        <Animated.View style={[styles.bg, animatedBgStyle]} />
        <Svg width={150} height={150} viewBox="0 0 100 100">
          <AnimatedPath animatedProps={animatedProps} fill="white" />
          <AnimatedPath animatedProps={animatedProps2} fill="white" />
        </Svg>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242426",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: 150,
  },
});
