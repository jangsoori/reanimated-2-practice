import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, useWindowDimensions,
} from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Indicator from './Indicator';

const slides = [
  { color: '#B97A95' },
  { color: '#F6AE99' },
  { color: '#F2E1C1' },
];

const SliderIndicator = () => {
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  //   const [index, setIndex] = useState(0);
  const progress = useSharedValue(0);
  const index = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      const { x } = e.contentOffset;
      //   setIndex(Math.round(x / width));
      index.value = Math.round(x / width);
      progress.value = x;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        snapToInterval={width}
        decelerationRate="fast"
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
      >
        {slides.map((slide) => {
          return (
            <View
              key={slide.color}
              style={[styles.slide, { backgroundColor: slide.color, width }]}
            />
          );
        })}
      </Animated.ScrollView>
      <View style={[styles.indicatorContainer, { bottom }]}>
        <Indicator progress={progress} count={slides.length} currentIndex={index} />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default SliderIndicator;
