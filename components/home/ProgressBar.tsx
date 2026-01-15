import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ProgressBarProps {
  progress: number; // value between 0 - 1
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
}

export default function ProgressBar({
  progress,
  height = 10,
  backgroundColor = "#E5E7EB",
  fillColor = "#1C58F2",
}: ProgressBarProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: Math.min(Math.max(progress, 0), 1),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor, borderRadius: height / 2 },
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            width: widthInterpolate,
            backgroundColor: fillColor,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
