import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';

import { heroBanners } from '@/constants/data';
import { colors, radius, spacing } from '@/constants/theme';

const AUTO_SCROLL_MS = 4000;

/** "Hero Banner like website" – auto-sliding carousel with dots */
export function HeroCarousel() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const cardWidth = width - spacing.screen * 2;
  const cardHeight = (cardWidth * 602) / 1080; // banners are 16:9

  // auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      const next = (index + 1) % heroBanners.length;
      listRef.current?.scrollToOffset({ offset: next * width, animated: true });
      setIndex(next);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(t);
  }, [index, width]);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View>
      <FlatList
        ref={listRef}
        data={heroBanners}
        keyExtractor={(b) => b.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <View style={{ width, paddingHorizontal: spacing.screen }}>
            <Pressable style={[styles.card, { width: cardWidth, height: cardHeight }]}>
              <Image
                source={item.image}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                accessibilityLabel={item.title}
                transition={200}
              />
            </Pressable>
          </View>
        )}
      />
      <View style={styles.dots}>
        {heroBanners.map((b, i) => (
          <View key={b.id} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.line },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.line },
  dotActive: { width: 20, backgroundColor: colors.primary },
});
