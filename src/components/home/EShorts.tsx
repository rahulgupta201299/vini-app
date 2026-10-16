import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { appElements, eShorts } from '@/constants/data';
import { colors, radius, spacing } from '@/constants/theme';
import { SectionHeader } from '@/components/ui';

/** "eShorts | App elements" – short concept reels + quick app features strip */
export function EShorts() {
  return (
    <View>
      <SectionHeader title="eShorts" subtitle="60-second concept videos" right="Watch all" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {eShorts.map((s) => (
          <Pressable key={s.id} style={({ pressed }) => [pressed && { opacity: 0.9 }]}>
            <LinearGradient colors={s.colors} style={styles.reel} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.subject}>{s.subject}</Text>
              <View style={styles.play}>
                <Ionicons name="play" size={18} color="#fff" style={{ marginLeft: 2 }} />
              </View>
              <View>
                <Text style={styles.reelTitle} numberOfLines={3}>
                  {s.title}
                </Text>
                <View style={styles.views}>
                  <Ionicons name="eye-outline" size={11} color="rgba(255,255,255,0.85)" />
                  <Text style={styles.viewsText}>{s.views}</Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.elements}>
        {appElements.map((a) => (
          <Pressable key={a.id} style={styles.element}>
            <View style={styles.elementIcon}>
              <MaterialCommunityIcons name={a.icon as any} size={20} color={colors.primary} />
            </View>
            <Text style={styles.elementText} numberOfLines={2}>
              {a.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: spacing.screen, gap: 10 },
  reel: {
    width: 116,
    height: 190,
    borderRadius: radius.md,
    padding: 10,
    justifyContent: 'space-between',
  },
  subject: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  play: {
    alignSelf: 'center',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reelTitle: { color: '#fff', fontWeight: '800', fontSize: 13, lineHeight: 16 },
  views: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  viewsText: { color: 'rgba(255,255,255,0.85)', fontSize: 10.5, fontWeight: '600' },
  elements: {
    flexDirection: 'row',
    marginHorizontal: spacing.screen,
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  element: { flex: 1, alignItems: 'center', gap: 6, paddingHorizontal: 2 },
  elementIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  elementText: { fontSize: 11, fontWeight: '700', color: colors.inkSoft, textAlign: 'center' },
});
