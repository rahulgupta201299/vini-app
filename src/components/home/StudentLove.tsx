import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { testimonials } from '@/constants/data';
import { colors, radius, shadow, spacing } from '@/constants/theme';
import { BottomSheet, PrimaryButton, SectionHeader } from '@/components/ui';

const CARD_W = 210;
const STRING_H = 34; // height of the "hanging string" triangle
const INSET = 18; // where the strings meet the card

function Stars({ value, size = 13, onChange }: { value: number; size?: number; onChange?: (v: number) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: onChange ? 10 : 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Pressable key={i} disabled={!onChange} onPress={() => onChange?.(i)} hitSlop={4}>
          <Ionicons name={i <= value ? 'star' : 'star-outline'} size={size} color={colors.star} />
        </Pressable>
      ))}
    </View>
  );
}

/** One of the two strings from the pin to the card's top corner */
function StringLine({ side }: { side: 'left' | 'right' }) {
  const dx = CARD_W / 2 - INSET;
  const len = Math.sqrt(dx * dx + STRING_H * STRING_H);
  const angle = (Math.atan2(STRING_H, side === 'left' ? -dx : dx) * 180) / Math.PI;
  const midX = side === 'left' ? (CARD_W / 2 + INSET) / 2 : (CARD_W / 2 + CARD_W - INSET) / 2;
  return (
    <View
      style={{
        position: 'absolute',
        width: len,
        height: 1.5,
        backgroundColor: colors.faint,
        left: midX - len / 2,
        top: STRING_H / 2,
        transform: [{ rotate: `${angle}deg` }],
      }}
    />
  );
}

/** "Student Love ❤" – hanging testimonial cards + "Rate Your Love" */
export function StudentLove() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setSent(false);
      setRating(0);
      setText('');
    }, 300);
  };

  return (
    <View>
      <SectionHeader title="Student Love ❤️" subtitle="What our aspirants say about us" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {testimonials.map((t, i) => (
          <View key={t.id} style={[styles.hanger, { transform: [{ rotate: i % 2 ? '1.5deg' : '-1.5deg' }] }]}>
            <View style={{ height: STRING_H, width: CARD_W }}>
              <StringLine side="left" />
              <StringLine side="right" />
              <View style={[styles.pin, { backgroundColor: t.color }]} />
            </View>
            <View style={styles.card}>
              <View style={[styles.avatar, { backgroundColor: t.color }]}>
                <Text style={styles.avatarText}>{t.name.charAt(0)}</Text>
              </View>
              <Ionicons name="chatbox-ellipses-outline" size={16} color={colors.faint} style={styles.quoteIcon} />
              <Text style={styles.quote} numberOfLines={5}>
                “{t.quote}”
              </Text>
              <Stars value={t.rating} />
              <Text style={styles.name}>{t.name}</Text>
              <Text style={styles.detail}>{t.detail}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.rateWrap}>
        <Pressable style={({ pressed }) => [styles.rateBtn, pressed && { opacity: 0.85 }]} onPress={() => setOpen(true)}>
          <Ionicons name="heart" size={18} color={colors.primary} />
          <Text style={styles.rateText}>Rate Your Love</Text>
        </Pressable>
      </View>

      <BottomSheet visible={open} onClose={close} title={sent ? 'Thank you! 💖' : 'Rate your experience'}>
        {sent ? (
          <View style={{ alignItems: 'center', paddingVertical: 16, gap: 12 }}>
            <Ionicons name="heart-circle" size={64} color={colors.primary} />
            <Text style={styles.thanks}>Your feedback helps us teach better.</Text>
            <View style={{ alignSelf: 'stretch' }}>
              <PrimaryButton label="Done" onPress={close} />
            </View>
          </View>
        ) : (
          <View style={{ gap: 16 }}>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <Stars value={rating} size={34} onChange={setRating} />
              <Text style={styles.detail}>{rating ? `${rating} / 5` : 'Tap a star to rate'}</Text>
            </View>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Tell us what you love (optional)"
              placeholderTextColor={colors.faint}
              style={styles.input}
              multiline
            />
            <PrimaryButton label="Submit" disabled={!rating} onPress={() => setSent(true)} />
          </View>
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: spacing.screen, gap: 14, paddingTop: 4, paddingBottom: 10 },
  hanger: { width: CARD_W, alignItems: 'center' },
  pin: {
    position: 'absolute',
    top: -5,
    left: CARD_W / 2 - 7,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#fff',
    ...shadow,
  },
  card: {
    width: CARD_W,
    minHeight: 210,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 14,
    paddingTop: 26,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
  },
  avatar: {
    position: 'absolute',
    top: -18,
    alignSelf: 'center',
    left: CARD_W / 2 - 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 15 },
  quoteIcon: { marginBottom: 4 },
  quote: { fontSize: 13, lineHeight: 19, color: colors.inkSoft, marginBottom: 10, flexGrow: 1 },
  name: { fontSize: 14, fontWeight: '800', color: colors.ink, marginTop: 6 },
  detail: { fontSize: 12, color: colors.muted },
  rateWrap: { alignItems: 'center', marginTop: 10 },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 22,
    height: 46,
    borderRadius: radius.pill,
  },
  rateText: { color: colors.primary, fontWeight: '800', fontSize: 15 },
  input: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: 12,
    fontSize: 14.5,
    color: colors.ink,
    textAlignVertical: 'top',
  },
  thanks: { fontSize: 15, color: colors.inkSoft, textAlign: 'center' },
});
