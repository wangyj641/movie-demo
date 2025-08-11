import { config } from 'dotenv';

// 加载 .env 文件
config();

export default {
  expo: {
    name: "movie-demo",
    slug: "movie-demo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      TMDB_API_KEY: process.env.TMDB_API_KEY || "d668b550701356ac42a2a07eaadbdc60",
    },
  },
};
