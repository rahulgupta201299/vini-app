import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { specialPrograms } from '@/constants/data';
import { radius, spacing } from '@/constants/theme';
import { SectionHeader } from '@/components/ui';

const A4_RATIO = 1.414; // height / width of an A4 sheet

/** "Special Program" – A4-sized poster cards */
export function SpecialProgram() {
  const { width } = useWindowDimensions();
  const cardW = Math.min(320, width * 0.7);
  const cardH = cardW * A4_RATIO;

  return (
    <View>
      <SectionHeader title="Special Program" subtitle="Hand-picked programs for serious aspirants" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        snapToInterval={cardW + 14}
        decelerationRate="fast"
      >
        {specialPrograms.map((p) => (
          <LinearGradient
            key={p.id}
            colors={p.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.poster, { width: cardW, height: cardH }]}
          >
            {/* decorative circles */}
            <View style={[styles.circle, { width: cardW, height: cardW, top: -cardW * 0.45, right: -cardW * 0.4 }]} />
            <View style={[styles.circle, { width: cardW * 0.6, height: cardW * 0.6, bottom: -cardW * 0.2, left: -cardW * 0.25 }]} />

            <View>
              <Text style={styles.kicker}>{p.kicker}</Text>
              <Text style={styles.title}>{p.title}</Text>
              <View style={[styles.highlight, { backgroundColor: p.accent }]}>
                <Text style={styles.highlightText}>{p.highlight}</Text>
              </View>
            </View>

            <View style={{ gap: 9 }}>
              {p.points.map((pt) => (
                <View key={pt} style={styles.point}>
                  <MaterialCommunityIcons name="check-decagram" size={16} color={p.accent} />
                  <Text style={styles.pointText}>{pt}</Text>
                </View>
              ))}
            </View>

            <Pressable style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}>
              <Text style={[styles.ctaText, { color: p.colors[1] }]}>{p.cta}</Text>
              <Ionicons name="arrow-forward" size={16} color={p.colors[1]} />
            </Pressable>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: spacing.screen, gap: 14 },
  poster: {
    borderRadius: radius.xl,
    padding: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  kicker: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: '#fff', fontSize: 28, fontWeight: '900', lineHeight: 32, marginTop: 8 },
  highlight: {
    alignSelf: 'flex-start',
    marginTop: 12,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  highlightText: { fontWeight: '900', fontSize: 15, color: '#0F172A' },
  point: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pointText: { color: '#fff', fontSize: 13.5, fontWeight: '600', flex: 1 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#fff',
    borderRadius: radius.md,
    height: 46,
  },
  ctaText: { fontWeight: '900', fontSize: 15 },
});
