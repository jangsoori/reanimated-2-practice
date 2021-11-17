import React from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated from "react-native-reanimated";

interface PickerItemProps {
  color: string;
  disabled: boolean;
  handlePress: () => void;
  size: number;
  width: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PickerItem = ({
  disabled,
  color,
  handlePress,
  size,
  width,
}: PickerItemProps) => {
  return (
    <Animated.View
      style={{
        width,
        alignItems: "center",
        marginRight: 10,
      }}
    >
      <AnimatedPressable
        disabled={disabled}
        onPress={handlePress}
        style={[
          styles.picker,
          { backgroundColor: color, width: size, height: size },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderRadius: 50,
  },
});
