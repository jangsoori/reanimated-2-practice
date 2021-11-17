import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

const { width, height } = Dimensions.get("window");

const aspectRatio = 722 / 368;
const CARD_WIDTH = width - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const SNAP_POINTS = [-width, 0, width];
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
  index: number;
  shuffle: Animated.SharedValue<boolean>;
}

export const Card = ({ card: { source }, index, shuffle }: CardProps) => {
  const INITIAL_ROTATION = Math.random() * 20 - 10;
  const x = useSharedValue(0);
  const y = useSharedValue(-height);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1500 },
        { rotateX: "20deg" },
        { rotateZ: `${rotateZ.value}deg` },
        { translateX: x.value },
        { translateY: y.value },
        { scale: scale.value },
      ],
    };
  });

  useAnimatedReaction(
    () => shuffle.value,
    (value) => {
      if (value) {
        rotateZ.value = withSpring(INITIAL_ROTATION);
        x.value = withSpring(0, {}, () => {
          shuffle.value = false;
        });
      }
    }
  );

  useEffect(() => {
    y.value = withDelay(
      index * DURATION,
      withTiming(0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      })
    );
    rotateZ.value = withTiming(INITIAL_ROTATION, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [INITIAL_ROTATION, index, rotateZ, y]);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
      scale.value = withTiming(1.2, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
      rotateZ.value = withTiming(0, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    },
    onActive: (e, ctx) => {
      x.value = e.translationX + ctx.x;
      y.value = e.translationY + ctx.y;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const destination = snapPoint(x.value, velocityX, SNAP_POINTS);
      x.value = withSpring(destination, { velocity: velocityX });
      y.value = withSpring(0, { velocity: velocityY });
      scale.value = withTiming(1, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
      rotateZ.value = withTiming(
        INITIAL_ROTATION,
        {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        },
        () => {
          if (index === 0 && destination !== 0) {
            shuffle.value = true;
          }
        }
      );
    },
  });

  return (
    <View
      onLayout={() => {
        //   x.value = withDelay(
        //     index * 100,
        //     withSpring(0, { velocity: 200, damping: 15 })
        //   );
      }}
      style={styles.container}
      pointerEvents="box-none"
    >
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.card, style]}>
          <Image
            source={source}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH * aspectRatio,
            }}
            resizeMode="contain"
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
