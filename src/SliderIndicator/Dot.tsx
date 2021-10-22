import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface DotProps {
    currentIndex: Animated.SharedValue<number>;
    index: number
}

const Dot = ({ currentIndex, index }: DotProps) => {
  const rStyle = useAnimatedStyle(() => {
    const isActive = currentIndex.value === index;
    return {
      opacity: withTiming(isActive ? 1 : 0.7),
      width: withTiming(isActive ? 30 : 10),
    };
  });

  return <Animated.View style={[styles.dot, rStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 30,
  },
});

export default Dot;
