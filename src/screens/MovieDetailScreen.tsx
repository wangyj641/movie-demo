// src/screens/MovieDetailScreen.tsx
import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity,
  Dimensions
} from "react-native";
import { getMovieDetail } from "../services/movieApi";
import { Movie } from "../types/movie";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, RADIUS, SHADOW, TYPO } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "MovieDetail">;

const { width: screenWidth } = Dimensions.get('window');

export default function MovieDetailScreen({ route, navigation }: Props) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getMovieDetail(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const posterUri = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : undefined;
  const backdropUri = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : posterUri;

  // Mock data for demonstration
  const cast = [
    { name: "Tom Holland", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { name: "Tobey Maguire", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { name: "Andrew Garfield", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  ];

  const cinemas = [
    { name: "HARTONO MALL CGV", distance: "4.53 Km", address: "Jl. Ring Road Utara Jl. Kaliw..", logo: "CGV", isSelected: true },
    { name: "LIPPO PLAZA JOGJA CINEPOLIS", distance: "6.2 Km", address: "Jl. Jend. Sudirman No. 50", logo: "cinépolis", isSelected: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Movie Poster Background */}
      <View style={styles.heroSection}>
        {backdropUri ? (
          <Image source={{ uri: backdropUri }} style={styles.heroImage} resizeMode="cover" />
        ) : (
          <View style={[styles.heroImage, { backgroundColor: COLORS.card }]} />
        )}
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)", COLORS.bg]}
          style={styles.heroGradient}
        />
      </View>

      {/* Movie Details Card */}
      <View style={styles.detailsCard}>
        <View style={styles.titleRow}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Text style={styles.bookmarkIcon}>🔖</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.movieMeta}>
          {movie.release_date?.split('-')[0]} • {movie.genres?.[0]?.name || 'Adventure'} • {movie.runtime ? `${Math.floor(movie.runtime / 60)}j ${movie.runtime % 60}m` : '2j 28m'}
        </Text>
        
        <View style={styles.directorSection}>
          <Text style={styles.directorLabel}>Sutradara</Text>
          <View style={styles.directorInfo}>
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" }}
              style={styles.directorImage}
            />
            <Text style={styles.directorName}>Jon Watts</Text>
            <TouchableOpacity style={styles.trailerButton}>
              <Text style={styles.trailerIcon}>▶</Text>
              <Text style={styles.trailerText}>Watch trailer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Synopsis Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsisText}>
            {movie.overview?.length > 100 
              ? `${movie.overview.substring(0, 100)}...` 
              : movie.overview || "No synopsis available."
            }
          </Text>
          {movie.overview && movie.overview.length > 100 && (
            <TouchableOpacity>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Cast Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cast</Text>
          <View style={styles.castContainer}>
            {cast.map((actor, index) => (
              <View key={index} style={styles.castItem}>
                <Image source={{ uri: actor.image }} style={styles.castImage} />
                <Text style={styles.castName}>{actor.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Cinema Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cinema</Text>
          {cinemas.map((cinema, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cinemaItem,
                cinema.isSelected && styles.selectedCinema
              ]}
            >
              <View style={styles.cinemaInfo}>
                <Text style={styles.cinemaName}>{cinema.name}</Text>
                <Text style={styles.cinemaDetails}>
                  {cinema.distance} • {cinema.address}
                </Text>
              </View>
              <View style={[
                styles.cinemaLogo,
                { backgroundColor: cinema.logo === 'CGV' ? '#DC2626' : '#2563EB' }
              ]}>
                <Text style={styles.cinemaLogoText}>{cinema.logo}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookNowButton}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: COLORS.text,
    fontWeight: '600',
  },
  heroSection: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  detailsCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 20,
    marginTop: -100,
    borderRadius: RADIUS.l,
    padding: 20,
    ...SHADOW.card,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  movieTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginRight: 16,
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkIcon: {
    fontSize: 18,
  },
  movieMeta: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  directorSection: {
    marginTop: 8,
  },
  directorLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  directorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  directorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  directorName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginRight: 16,
  },
  trailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.m,
  },
  trailerIcon: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 6,
  },
  trailerText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  synopsisText: {
    fontSize: 16,
    color: COLORS.textMuted,
    lineHeight: 24,
    marginBottom: 8,
  },
  readMoreText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  castContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  castItem: {
    alignItems: 'center',
  },
  castImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  castName: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  cinemaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: RADIUS.l,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCinema: {
    borderColor: COLORS.primary,
  },
  cinemaInfo: {
    flex: 1,
  },
  cinemaName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  cinemaDetails: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  cinemaLogo: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.m,
  },
  cinemaLogoText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
  },
  bookNowButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: RADIUS.l,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  bookNowText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.bg,
  },
});
