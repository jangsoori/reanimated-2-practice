import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useAnimatedProps, useSharedValue, withTiming,
} from 'react-native-reanimated';
import { parse, interpolatePath } from 'react-native-redash';

const initialD = parse([
  'M 0 0',
  'L 30 0',
  'L 30 100',
  'L 0 100',
].join(' '));

const targetD = parse([
  'M 0 0',
  'L 30 30',
  'V 70',
  'L 0 100',
].join(' '));

const initialD2 = parse([
  'M 50 0',
  'L 80 0',
  'L 80 100',
  'L 50 100',
].join(' '));

const targetD2 = parse([
  'M 30 30',
  'L 50 50',
  'V 50',
  'L 30 70',
].join(' '));

const AnimatedPath = Animated.createAnimatedComponent(Path);

const YoutubePlayButton = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return { d: interpolatePath(progress.value, [0, 1], [initialD, targetD]) };
  }); const animatedProps2 = useAnimatedProps(() => {
    return { d: interpolatePath(progress.value, [0, 1], [initialD2, targetD2]) };
  });
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          progress.value = withTiming(progress.value === 1 ? 0 : 1);
        }}
        style={styles.buttonContainer}
      >
        <Svg viewBox="0 0 100 100">
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
    backgroundColor: 'navy',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 300,
    height: 300,
  },
});

export default YoutubePlayButton;
