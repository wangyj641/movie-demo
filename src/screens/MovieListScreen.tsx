// src/screens/MovieListScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  TextInput,
  Dimensions,
  FlatList
} from "react-native";
import { getPopularMovies } from "../services/movieApi";
import { Movie } from "../types/movie";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { COLORS, TYPO, RADIUS, SHADOW } from "../theme/tokens";
import { LinearGradient } from "expo-linear-gradient";

type Props = NativeStackScreenProps<RootStackParamList, "MovieList">;

const { width: screenWidth } = Dimensions.get('window');

export default function MovieListScreen({ navigation }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const carouselRef = useRef<FlatList>(null);

  const load = async () => {
    const data = await getPopularMovies();
    setMovies(data);
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const handleCarouselScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (screenWidth * 0.6));
    setCurrentCarouselIndex(index);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const nowPlayingMovies = movies.slice(0, 5);
  const comingSoonMovies = movies.slice(5, 8);

  const renderCarouselItem = ({ item, index }: { item: Movie; index: number }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
    >
      <Image 
        source={{ 
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` 
        }}
        style={styles.carouselPoster}
        resizeMode="cover"
      />
      <View style={styles.carouselInfo}>
        <Text style={styles.carouselTitle} numberOfLines={1}>
          {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
        </Text>
        <Text style={styles.carouselGenre}>
          {item.genres?.[0]?.name || 'Adventure'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <View>
            <Text style={styles.welcomeText}>Welcome Khadafi 🔥</Text>
            <Text style={styles.subtitleText}>Let's relax and watch a movie.</Text>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
            style={styles.profileImage}
          />
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movie, cinema, genre..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Now Playing Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Now Playing</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          ref={carouselRef}
          data={nowPlayingMovies}
          renderItem={renderCarouselItem}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
          onMomentumScrollEnd={handleCarouselScroll}
          pagingEnabled={false}
          snapToInterval={screenWidth * 0.6}
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: screenWidth * 0.6,
            offset: screenWidth * 0.6 * index,
            index,
          })}
        />
        
        {/* Carousel Indicators */}
        <View style={styles.indicators}>
          {nowPlayingMovies.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.indicator, 
                index === currentCarouselIndex ? styles.activeIndicator : null
              ]} 
            />
          ))}
        </View>
      </View>

      {/* Coming Soon Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {comingSoonMovies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            style={styles.comingSoonItem}
            onPress={() => navigation.navigate("MovieDetail", { movieId: movie.id })}
          >
            <Image 
              source={{ 
                uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
              }}
              style={styles.comingSoonPoster}
              resizeMode="cover"
            />
            <View style={styles.comingSoonInfo}>
              <Text style={styles.comingSoonTitle}>{movie.title}</Text>
              <Text style={styles.comingSoonGenre}>
                {movie.genres?.slice(0, 3).map(g => g.name).join(', ') || 'Action, Adventure, Comedy'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: RADIUS.l,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAllText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  carouselContainer: {
    paddingLeft: screenWidth * 0.1,
    paddingRight: screenWidth * 0.1,
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.6,
    paddingHorizontal: 10,
  },
  carouselPoster: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.75,
    borderRadius: RADIUS.l,
    marginBottom: 16,
    ...SHADOW.card,
  },
  carouselInfo: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  carouselGenre: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 12,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#374151',
    opacity: 0.4,
  },
  activeIndicator: {
    backgroundColor: COLORS.primary,
    opacity: 1,
    transform: [{ scale: 1.3 }],
  },
  comingSoonItem: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: RADIUS.l,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  comingSoonPoster: {
    width: 60,
    height: 80,
    borderRadius: RADIUS.m,
    marginRight: 16,
  },
  comingSoonInfo: {
    flex: 1,
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  comingSoonGenre: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
});
