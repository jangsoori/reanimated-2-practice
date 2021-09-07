import React from 'react';
import {
  StyleSheet, View, Image, Dimensions, RefreshControl,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming,
} from 'react-native-reanimated';
import img from '../../assets/images/expandable_header.jpg';

const { width, height } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function ExpandedButton() {
  const translationY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      height: translationY.value < 0 ? (height * 0.4) - translationY.value : (height * 0.4),
      opacity: opacity.value,
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <AnimatedImage
        onLoad={() => {
          opacity.value = withTiming(1);
        }}
        source={img}
        style={[styles.imageStyle, animatedImageStyle]}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEventThrottle={16}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          )}
      >
        <View style={styles.foreground}>
          <View style={{ height: height * 2 }} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  foreground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 20,
    backgroundColor: 'dodgerblue',
    padding: 10,
    marginTop: 270,
    flex: 1,
  },
  headerContainer: {},
  imageStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    resizeMode: 'cover',
    width,
  },
});
