import React from 'react';
import {
  StyleSheet, Pressable, Alert,
} from 'react-native';
import Animated, {
  interpolate, useAnimatedStyle, withSpring,
} from 'react-native-reanimated';

const RADIUS = 150;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ExpandedButtonProps {
  height: number,
  longTap: Animated.SharedValue<number>,
  i: number,
  icon: () => React.ReactNode
}

const SPRING_CONFIG = {
  damping: 4,
  mass: 0.15,
  stiffness: 100,
  overshootClamping: false,
};

export default function ExpandedButton({
  height, longTap, i, icon,
}:ExpandedButtonProps) {
  const rStyle = useAnimatedStyle(() => {
    const angles = [-100, -135, -170];
    // const angle = -100 + 35 * -i;
    const rad = angles[i] * (Math.PI / 180);
    const getPointXOnCircle = RADIUS * Math.cos(rad);
    const getPointYOnCircle = RADIUS * Math.sin(rad);

    return {
      transform: [
        { translateY: withSpring(interpolate(longTap.value, [0, 1], [0, getPointYOnCircle]), SPRING_CONFIG) },
        { translateX: withSpring(interpolate(longTap.value, [0, 1], [0, getPointXOnCircle]), SPRING_CONFIG) },
        { rotate: `${interpolate(longTap.value, [0, 1], [80, 0])}deg` },
      ],
      opacity: interpolate(longTap.value, [0, 1], [0, 1]),
    };
  });
  return (
    <AnimatedPressable
      onPress={() => {
        Alert.alert('pressed');
      }}
      style={[styles.btn, { height, width: height }, rStyle]}
    >
      {icon()}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 50,
    shadowColor: '#262e36',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
});
