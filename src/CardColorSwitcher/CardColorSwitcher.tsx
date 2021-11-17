import React from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

import { Card } from "./Card";
import { Picker } from "./Picker";

export const CardColorSwitcher = () => {
  const [currentColor, setCurrentColor] = React.useState("#a4b6dd");
  const [nextColor, setNextColor] = React.useState<string | null>(null);
  const [disabled, setDisabled] = React.useState(false);
  const progress = useSharedValue(0);

  const handlePress = (color: string) => {
    setDisabled(true);
    setNextColor(color);
    progress.value = withTiming(1, { duration: 300 });

    setTimeout(() => {
      setCurrentColor(color);
      setNextColor(null);
      setDisabled(false);
      progress.value = 0;
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Card progress={progress} color={currentColor} nextColor={nextColor} />
      <Picker handlePress={handlePress} disabled={disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#565c5b",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 120,
  },
});
