import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 40;
const CARD_HEIGHT = CARD_WIDTH / 1.586;

interface CardProps {
  color: string;
  index: number;
  expanded: Animated.SharedValue<boolean>;
}

export const Card = ({ color, index, expanded }: CardProps) => {
  const INITIAL_Y = index * 20;
  const y = useSharedValue(INITIAL_Y);

  const style = useAnimatedStyle(() => {
    console.log(expanded.value);
    return {
      transform: [{ translateY: y.value }],
    };
  });

  useAnimatedReaction(
    () => expanded.value,
    (value) => {
      if (value) {
        y.value = withSpring(index * CARD_HEIGHT + index * 20, { damping: 15 });
      }

      if (!value) {
        y.value = withSpring(INITIAL_Y, { damping: 15 });
      }
    }
  );
  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View style={[styles.card, { backgroundColor: color }, style]}>
        <Text style={styles.bankName}>MONZO</Text>
        <Text style={styles.cardNumber}>5535 •••• •••• 2296</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.holderName}>John Doe</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    padding: 15,
    overflow: "hidden",
  },
  bankName: {
    fontWeight: "600",
    color: "white",
    marginBottom: 60,
    fontSize: 18,
  },
  cardNumber: {
    fontWeight: "600",
    color: "white",
    fontSize: 20,
    letterSpacing: 3,
    flex: 1,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  holderName: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
  },
});
