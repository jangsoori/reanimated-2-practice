import React from 'react';
import {
  Dimensions, Pressable, StyleSheet, View,
} from 'react-native';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const WIDTH = width / 3;
const RADIUS = 45;

interface ColorProps {
    color:string,
    onPress:any,
    translateX: Animated.SharedValue<number>
}

export default function Color({ color, onPress, translateX }: ColorProps) {
  const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onActive: ({ absoluteX: x, absoluteY: y }) => {
      runOnJS(onPress)(({ x, y }));
    },
  });
  return (
    <Animated.View
      style={{ width: WIDTH, alignItems: 'center' }}
    >
      <TapGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.container, { backgroundColor: color }]} />
      </TapGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    borderWidth: 6,
    borderColor: 'white',
  },
});
