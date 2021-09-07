import React from 'react';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width - 40;
const CARD_HEIGHT = CARD_WIDTH / 1.586;

interface CardProps {
    color: string,
    progress: Animated.SharedValue<number>,
    nextColor:string | null
}

const Card = ({ color, progress, nextColor }:CardProps) => {
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [CARD_HEIGHT, 0]),
        },
      ],
      width: interpolate(progress.value, [0, 1], [0, CARD_WIDTH]),
      borderRadius: interpolate(progress.value, [0, 0.7, 1], [CARD_WIDTH / 2, CARD_WIDTH / 4, 8]),
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={{ zIndex: 1, flex: 1 }}>
        <Text style={styles.bankName}>MONZO</Text>
        <Text style={styles.cardNumber}>5535 •••• •••• 2296</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.holderName}>John Doe</Text>
        </View>
      </View>
      <Animated.View
        style={[
          style,
          styles.newBackground,
          { backgroundColor: nextColor || '' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    padding: 15,
    overflow: 'hidden',
  },
  bankName: {
    fontWeight: '600',
    color: 'white',
    marginBottom: 60,
    fontSize: 18,
  },
  cardNumber: {
    fontWeight: '600',
    color: 'white',
    fontSize: 20,
    letterSpacing: 3,
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  holderName: {
    fontWeight: '600',
    color: 'white',
    fontSize: 18,
  },
  newBackground: {
    ...StyleSheet.absoluteFillObject,
    height: CARD_HEIGHT,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default Card;
