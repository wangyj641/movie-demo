// src/components/RatingBadge.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, RADIUS, TYPO } from "../theme/tokens";

export default function RatingBadge({ value }: { value: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>⭐ {value.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.65)",
    borderRadius: RADIUS.m,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: { ...TYPO.meta, color: COLORS.text },
});
