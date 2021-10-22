import React from 'react';
import {
  View, Text, StyleSheet, useWindowDimensions,
} from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface Props {
    count: number,
    currentIndex: Animated.SharedValue<number>,
    progress: Animated.SharedValue<number>
}

const Dot = ({ count, index, progress }:{index:number, progress:Animated.SharedValue<number>, count:number}) => {
  const { width } = useWindowDimensions();
  const rStyle = useAnimatedStyle(() => {
    // const opacity = interpolate(progress.value,
    //   [
    //     width * (index - 1),
    //     width * index,
    //     width * (index + 1),
    //   ],
    //   [0.5, 1, 0.5]);
    const opacity = interpolate(progress.value,
      [width * (index - 1), width * index, width * (index + 1)],
      [0.5, 1, 0.5]);
    return {
      opacity,
    };
  });

  return (

    <Animated.View style={[styles.dot, rStyle]} />

  );
};

const Indicator = ({ count, currentIndex, progress }: Props) => {
  const countArray = Array.from(Array(count).keys());

  return (
    <View style={styles.container}>
      {countArray.map((_, i) => {
        return (
          <>
            <Dot progress={progress} index={i} count={count} />
            {i !== countArray.length - 1 && <View style={{ width: 10 }} />}
          </>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default Indicator;
