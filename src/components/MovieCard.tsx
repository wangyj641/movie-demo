// src/components/MovieCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Movie } from "../types/movie";
import { COLORS, GRID, RADIUS, SHADOW, TYPO } from "../theme/tokens";
import RatingBadge from "./RatingBadge";

interface Props {
  movie: Movie;
  onPress: () => void;
}

export default function MovieCard({ movie, onPress }: Props) {
  const posterUri = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : undefined;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.root}>
      <View style={styles.posterWrap}>
        {posterUri ? (
          <Image source={{ uri: posterUri }} style={styles.poster} resizeMode="cover" />
        ) : (
          <View style={[styles.poster, styles.posterPlaceholder]} />
        )}
        <RatingBadge value={movie.vote_average ?? 0} />
      </View>

      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>
      <Text numberOfLines={1} style={styles.meta}>
        {movie.release_date || "Unknown"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: GRID.itemWidth,
    marginBottom: GRID.gap,
  },
  posterWrap: {
    borderRadius: RADIUS.l,
    overflow: "hidden",
    backgroundColor: COLORS.card,
    ...SHADOW.card,
  },
  poster: {
    width: "100%",
    aspectRatio: GRID.posterAspect, // 固定 2:3 比例，防止变形
  },
  posterPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...TYPO.h2,
    color: COLORS.text,
    marginTop: 8,
  },
  meta: {
    ...TYPO.meta,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
