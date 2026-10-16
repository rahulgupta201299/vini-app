import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { goals, logo } from '@/constants/data';
import { colors, radius, spacing } from '@/constants/theme';
import { BottomSheet } from '@/components/ui';

/** Row 1 of the sketch: small logo · Current Goal (UPSC CSE) · Refer & Earn · Notification */
export function HomeHeader() {
  const [goalId, setGoalId] = useState(goals[0].id);
  const [pickerOpen, setPickerOpen] = useState(false);
  const goal = goals.find((g) => g.id === goalId) ?? goals[0];

  return (
    <View style={styles.row}>
      <Image source={logo} style={styles.logo} contentFit="contain" accessibilityLabel="Vini IAS" />

      <Pressable style={styles.goal} onPress={() => setPickerOpen(true)} hitSlop={6}>
        <Text style={styles.goalLabel}>Current Goal</Text>
        <View style={styles.goalValueRow}>
          <Text style={styles.goalValue} numberOfLines={1}>
            {goal.label}
          </Text>
          <Ionicons name="chevron-down" size={16} color={colors.ink} />
        </View>
      </Pressable>

      <Pressable style={styles.refer} onPress={() => router.push('/profile')}>
        <MaterialCommunityIcons name="gift-outline" size={20} color={colors.primary} />
        <Text style={styles.referText}>Refer & Earn</Text>
      </Pressable>

      <Pressable style={styles.bell} accessibilityLabel="Notifications" hitSlop={6}>
        <Ionicons name="notifications-outline" size={22} color={colors.ink} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </Pressable>

      <BottomSheet visible={pickerOpen} onClose={() => setPickerOpen(false)} title="Select your goal">
        {goals.map((g) => {
          const active = g.id === goalId;
          return (
            <Pressable
              key={g.id}
              style={[styles.goalOption, active && styles.goalOptionActive]}
              onPress={() => {
                setGoalId(g.id);
                setPickerOpen(false);
              }}
            >
              <View>
                <Text style={[styles.goalOptionText, active && { color: colors.primary }]}>{g.label}</Text>
                <Text style={styles.goalOptionGroup}>{g.group}</Text>
              </View>
              <Ionicons
                name={active ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={active ? colors.primary : colors.faint}
              />
            </Pressable>
          );
        })}
      </BottomSheet>
    </View>
  );
}

/** Row 2 of the sketch: search box + "Study" button */
export function SearchRow() {
  const [query, setQuery] = useState('');
  return (
    <View style={styles.searchRow}>
      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.faint} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for courses, tests…"
          placeholderTextColor={colors.faint}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>
      <Pressable
        style={({ pressed }) => [styles.study, pressed && { opacity: 0.85 }]}
        onPress={() => router.push('/study')}
      >
        <MaterialCommunityIcons name="book-open-variant" size={18} color="#fff" />
        <Text style={styles.studyText}>Study</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screen,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  logo: { width: 64, height: 27 },
  goal: { flex: 1, paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: colors.line },
  goalLabel: { fontSize: 11, color: colors.muted, fontWeight: '600' },
  goalValueRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  goalValue: { fontSize: 16, fontWeight: '800', color: colors.ink },
  refer: { alignItems: 'center' },
  referText: { fontSize: 10, fontWeight: '700', color: colors.primary, marginTop: 1 },
  bell: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    top: 3,
    right: 3,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: { color: '#fff', fontSize: 8, fontWeight: '800' },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 8,
  },
  goalOptionActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  goalOptionText: { fontSize: 15, fontWeight: '700', color: colors.ink },
  goalOptionGroup: { fontSize: 12, color: colors.muted, marginTop: 1 },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: spacing.screen,
    paddingBottom: 14,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 46,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line,
  },
  searchInput: { flex: 1, fontSize: 14.5, color: colors.ink, paddingVertical: 0 },
  study: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 46,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  studyText: { color: '#fff', fontWeight: '800', fontSize: 14.5 },
});
