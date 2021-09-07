import React, { useState } from 'react';
import {
  StyleSheet, Pressable, Text,
} from 'react-native';
import Animated, {
  interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Portal } from '@gorhom/portal';
import { AntDesign } from '@expo/vector-icons';
import ExpandedButton from './ExpandedButton';

const BUTTON_SIZE = 60;

const buttons = [
  { icon: () => { return <AntDesign name="antdesign" size={28} color="white" />; }, key: '1' },
  { icon: () => { return <AntDesign name="picture" size={28} color="white" />; }, key: '2' },
  { icon: () => { return <AntDesign name="adduser" size={28} color="white" />; }, key: '3' },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Twitter() {
  const progress = useSharedValue(0);
  const longTap = useSharedValue(0);
  const [longTapActive, setLongTapActive] = useState(false);

  const mainButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: interpolate(progress.value, [0, 1], [1, 0.75]),
      }],
      backgroundColor: interpolateColor(longTap.value, [0, 1], ['#1DA1F2', '#262e36']),
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(longTap.value, [0, 1], [0, 0.8]),
    };
  });

  const resetValues = () => {
    if (progress.value === 1 && longTap.value === 1) {
      progress.value = withTiming(0, { duration: 250 });
      if (longTapActive) {
        longTap.value = withTiming(0, { duration: 250 }, () => {
          runOnJS(setLongTapActive)(false);
        });
      }
    }
  };

  const handleOverlayTap = () => {
    resetValues();
  };

  const handleMainBtnPress = () => {
    resetValues();
  };

  const handleMainBtnPressIn = () => {
    progress.value = withTiming(1, { duration: 250 });
  };

  const handleMainBtnPressOut = () => {
    if (!longTapActive) {
      longTap.value = withTiming(0, { duration: 250 });
      progress.value = withTiming(0, { duration: 200 });
    }
  };

  const handleMainBtnLongPress = async () => {
    setLongTapActive(true);
    longTap.value = withTiming(1, { duration: 200 });
    await Haptics.impactAsync();
  };

  const renderMainBtn = () => {
    return !longTapActive ? <AntDesign name="twitter" size={28} color="white" />
      : <AntDesign name="close" size={24} color="#1DA1F2" />;
  };

  const renderExpandedButtonableBtns = () => {
    return buttons.map((btn, i) => {
      return (
        <ExpandedButton
          i={i}
          key={btn.key}
          icon={btn.icon}
          longTap={longTap}
          height={BUTTON_SIZE}
        />
      );
    });
  };

  return (
    <Pressable style={styles.container}>
      <Text>{longTapActive ? 'Active' : 'Not active'}</Text>
      <Portal>
        {longTapActive && (
        <AnimatedPressable
          onPress={handleOverlayTap}
          style={[styles.overlay, overlayStyle]}
        />
        )}
        <Animated.View style={styles.buttonsContainer}>
          <AnimatedPressable
            onPress={handleMainBtnPress}
            onPressIn={handleMainBtnPressIn}
            onPressOut={handleMainBtnPressOut}
            onLongPress={handleMainBtnLongPress}
            style={[styles.mainBtn, mainButtonStyle]}
          >
            {renderMainBtn()}
          </AnimatedPressable>
          {renderExpandedButtonableBtns()}
        </Animated.View>
      </Portal>
    </Pressable>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FA',
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 50,
    right: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    zIndex: 1,
    shadowColor: '#262e36',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#262e36',
  },

});
