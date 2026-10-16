import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { quickTiles } from '@/constants/data';
import { colors, radius, spacing } from '@/constants/theme';

/** Row of square tiles: All Batches · Current Affairs · Test Series · Daily Practice (Free) · … */
export function QuickTiles() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {quickTiles.map((t) => (
        <Pressable
          key={t.id}
          style={({ pressed }) => [styles.tile, pressed && { transform: [{ scale: 0.97 }] }]}
        >
          {t.free ? (
            <View style={styles.free}>
              <Text style={styles.freeText}>FREE</Text>
            </View>
          ) : null}
          <View style={[styles.iconWrap, { backgroundColor: t.bg }]}>
            <MaterialCommunityIcons name={t.icon as any} size={24} color={t.tint} />
          </View>
          <Text style={styles.label}>{t.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: spacing.screen, gap: 10, paddingTop: 6 },
  tile: {
    width: 80,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 11.5,
    lineHeight: 14,
    fontWeight: '700',
    color: colors.inkSoft,
    textAlign: 'center',
  },
  free: {
    position: 'absolute',
    top: -7,
    right: -4,
    zIndex: 1,
    backgroundColor: colors.green,
    borderRadius: radius.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  freeText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.4 },
});
