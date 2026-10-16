import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { popularCourses } from '@/constants/data';
import { colors, radius, shadow, spacing } from '@/constants/theme';
import { SectionHeader } from '@/components/ui';

const rupee = (n: number) => '₹' + n.toLocaleString('en-IN');

/** "Popular Courses   view all →" – course thumbnail cards */
export function PopularCourses() {
  const { width } = useWindowDimensions();
  const cardW = Math.min(300, width * 0.72);

  return (
    <View>
      <SectionHeader
        title="Popular Courses"
        subtitle="Most enrolled by aspirants"
        right="View all"
        onRightPress={() => router.push('/study')}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        snapToInterval={cardW + 14}
        decelerationRate="fast"
      >
        {popularCourses.map((c) => {
          const off = c.mrp ? Math.round(((c.mrp - c.price) / c.mrp) * 100) : 0;
          return (
            <Pressable key={c.id} style={[styles.card, { width: cardW }]}>
              <View>
                <Image source={c.image} style={{ width: cardW, height: cardW * 0.5625 }} contentFit="cover" />
                {c.tag ? (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{c.tag}</Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.body}>
                <Text style={styles.lang}>{c.language}</Text>
                <Text style={styles.title} numberOfLines={1}>
                  {c.title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  {c.subtitle}
                </Text>
                <View style={styles.footer}>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>{rupee(c.price)}</Text>
                    {c.mrp ? <Text style={styles.mrp}>{rupee(c.mrp)}</Text> : null}
                    {off ? <Text style={styles.off}>{off}% off</Text> : null}
                  </View>
                  <View style={styles.explore}>
                    <Text style={styles.exploreText}>Explore</Text>
                    <Ionicons name="arrow-forward" size={13} color="#fff" />
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: spacing.screen, gap: 14, paddingBottom: 6 },
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
  },
  tag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: colors.yellow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: { fontSize: 10.5, fontWeight: '800', color: colors.ink },
  body: { padding: 12 },
  lang: { fontSize: 11, fontWeight: '700', color: colors.primary, marginBottom: 2 },
  title: { fontSize: 15.5, fontWeight: '800', color: colors.ink },
  subtitle: { fontSize: 12.5, color: colors.muted, marginTop: 2 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, flexShrink: 1 },
  price: { fontSize: 16, fontWeight: '800', color: colors.ink },
  mrp: { fontSize: 12, color: colors.faint, textDecorationLine: 'line-through' },
  off: { fontSize: 11.5, fontWeight: '800', color: colors.green },
  explore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  exploreText: { color: '#fff', fontWeight: '800', fontSize: 12 },
});
