// src/theme/tokens.ts
import { Dimensions, Platform } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const COLORS = {
  bg: "#0F1115",
  card: "#171A21",
  text: "#FFFFFF",
  textMuted: "#A0A7B4",
  primary: "#FF6B35",
  divider: "rgba(255,255,255,0.06)",
};

export const RADIUS = { s: 8, m: 12, l: 16, xl: 20 };
export const SHADOW = {
  card: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
};

export const TYPO = {
  h1: { fontSize: moderateScale(22), fontWeight: "700", lineHeight: Platform.OS === "android" ? 28 : 26 },
  h2: { fontSize: moderateScale(16), fontWeight: "700", lineHeight: 22 },
  body: { fontSize: moderateScale(13), fontWeight: "400", lineHeight: 18 },
  meta: { fontSize: moderateScale(12), fontWeight: "500", lineHeight: 16 },
};

export const GRID = (() => {
  const { width } = Dimensions.get("window");
  // 安全留白 + 双列网格
  const horizontalPadding = 16;
  const gap = 12;
  const columns = 2;
  const itemWidth = Math.floor((width - horizontalPadding * 2 - gap * (columns - 1)) / columns);
  const posterAspect = 2 / 3; // 电影海报常见 2:3
  const itemHeight = Math.round(itemWidth / posterAspect + 64); // 64 预留给标题等信息
  return { padding: horizontalPadding, gap, columns, itemWidth, itemHeight, posterAspect };
})();
