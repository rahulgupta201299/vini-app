import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { marketingBanner, marketingStrip } from '@/constants/data';
import { colors, radius, spacing } from '@/constants/theme';

/** "Marketing Banner" – a wide promo banner with a slim promo strip under it */
export function MarketingBanner() {
  return (
    <View style={styles.wrap}>
      <Pressable style={[styles.banner, { aspectRatio: marketingBanner.aspectRatio }]}>
        <Image source={marketingBanner.image} style={StyleSheet.absoluteFill} contentFit="cover" />
      </Pressable>
      <Pressable style={[styles.strip, { aspectRatio: marketingStrip.aspectRatio }]}>
        <Image source={marketingStrip.image} style={StyleSheet.absoluteFill} contentFit="cover" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.screen, gap: 10 },
  banner: { width: '100%', borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.line },
  strip: { width: '100%', borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.line },
});
