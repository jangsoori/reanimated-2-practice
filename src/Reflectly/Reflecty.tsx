import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import Color from './Color';

const { width } = Dimensions.get('window');

const colors = [
  '#8d86c0',
  '#B97A95',
  '#F6AE99',
  '#F2E1C1',
  '#87A8A4',
  '#D9CAB3',
];

const snapPoints = colors.map((_, i) => -i * (width / 3));

export default function Reflectly() {
  const translateX = useSharedValue(0);
  const [selectedColor, setSelectedColor] = useState({
    current: colors[0],
    previous: colors[0],
    position: { x: 0, y: 0 },
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx:any) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (e, ctx:any) => {
      translateX.value = ctx.offsetX + e.translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest);
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{
      translateX: translateX.value,
    }],
  }));
  return (
    <View style={[styles.container,
      { backgroundColor: selectedColor.current }]}
    >
      <PanGestureHandler onGestureEvent={onGestureEvent}>

        <Animated.View style={[styles.colors, style]}>
          {/* PLACEHOLDER */}
          <View style={{ width: width / 3, flexDirection: 'row' }} />
          {colors.map((color, i) => (
            <Color
              onPress={(position:any) => {
                setSelectedColor((prev) => ({
                  current: color,
                  previous: prev.current,
                  position,
                }));
                translateX.value = withSpring(-i * (width / 3));
              }}
              translateX={translateX}
              color={color}
              key={color}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  colors: {
    flexDirection: 'row',
    width,
  },
});
