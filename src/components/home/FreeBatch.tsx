import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { freeCourses, freeTests } from '@/constants/data';
import { colors, radius, spacing } from '@/constants/theme';
import { SectionHeader } from '@/components/ui';

type Tab = 'courses' | 'test';

/** "Free Batch   [Courses] [Test]" – small cards that switch with the toggle */
export function FreeBatch() {
  const [tab, setTab] = useState<Tab>('courses');

  return (
    <View>
      <SectionHeader
        title="Free Batch"
        subtitle="Start learning at zero cost"
        right={
          <View style={styles.toggle}>
            {(['courses', 'test'] as Tab[]).map((t) => (
              <Pressable
                key={t}
                onPress={() => setTab(t)}
                style={[styles.toggleBtn, tab === t && styles.toggleBtnActive]}
              >
                <Text style={[styles.toggleText, tab === t && styles.toggleTextActive]}>
                  {t === 'courses' ? 'Courses' : 'Test'}
                </Text>
              </Pressable>
            ))}
          </View>
        }
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {tab === 'courses'
          ? freeCourses.map((c) => (
              <Pressable key={c.id} style={styles.card}>
                <Image source={c.image} style={styles.thumb} contentFit="cover" />
                <View style={styles.freeTag}>
                  <Text style={styles.freeTagText}>FREE</Text>
                </View>
                <View style={styles.body}>
                  <Text style={styles.title} numberOfLines={2}>
                    {c.title}
                  </Text>
                  <View style={styles.metaRow}>
                    <Ionicons name="play-circle-outline" size={13} color={colors.muted} />
                    <Text style={styles.meta}>{c.lessons} lessons</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Ionicons name="language-outline" size={13} color={colors.muted} />
                    <Text style={styles.meta} numberOfLines={1}>
                      {c.language}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))
          : freeTests.map((t) => (
              <Pressable key={t.id} style={[styles.card, styles.testCard]}>
                <View style={styles.testTop}>
                  <View style={styles.testIcon}>
                    <MaterialCommunityIcons name="clipboard-text-outline" size={20} color={colors.blue} />
                  </View>
                  <Text style={styles.testTag}>{t.tag}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>
                  {t.title}
                </Text>
                <View style={[styles.metaRow, { marginTop: 6 }]}>
                  <Text style={styles.meta}>{t.questions} Qs</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.meta}>{t.minutes} min</Text>
                </View>
                <View style={styles.attempt}>
                  <Text style={styles.attemptText}>Attempt Free</Text>
                  <Ionicons name="arrow-forward" size={13} color={colors.primary} />
                </View>
              </Pressable>
            ))}
      </ScrollView>
    </View>
  );
}

const CARD_W = 168;

const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.line,
  },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill },
  toggleBtnActive: { backgroundColor: colors.primary },
  toggleText: { fontSize: 12.5, fontWeight: '700', color: colors.muted },
  toggleTextActive: { color: '#fff' },
  row: { paddingHorizontal: spacing.screen, gap: 12 },
  card: {
    width: CARD_W,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  thumb: { width: CARD_W, height: CARD_W * 0.5625, backgroundColor: colors.line },
  freeTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.green,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  freeTagText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  body: { padding: 10 },
  title: { fontSize: 13.5, fontWeight: '700', color: colors.ink, lineHeight: 18 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  meta: { fontSize: 11.5, color: colors.muted, flexShrink: 1 },
  metaDot: { fontSize: 11, color: colors.faint },
  testCard: { padding: 12 },
  testTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  testIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testTag: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.blue,
    backgroundColor: colors.blueSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  attempt: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10 },
  attemptText: { fontSize: 12.5, fontWeight: '800', color: colors.primary },
});
