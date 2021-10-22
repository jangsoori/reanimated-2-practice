import React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated, { useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Indicator from './Indicator';

const slides = [
  { color: '#b84275' },
  { color: '#f38361' },
  { color: '#284b96' },
];

const SliderIndicator = () => {
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const scrollX = useSharedValue(0);
  const index = useDerivedValue(() => {
    return Math.round(scrollX.value / width);
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      const { x } = e.contentOffset;
      scrollX.value = x;
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
        <Indicator count={slides.length} currentIndex={index} />
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
