import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Dot from './Dot';

interface IndicatorProps {
    count: number,
    currentIndex: Animated.SharedValue<number>,
}

const Indicator = ({ count, currentIndex }: IndicatorProps) => {
  const countArray = Array.from(Array(count).keys());

  return (
    <View style={styles.container}>
      {countArray.map((_, i) => {
        return (
          <>
            <Dot index={i} currentIndex={currentIndex} />
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
    borderRadius: 30,
  },
});

export default Indicator;
