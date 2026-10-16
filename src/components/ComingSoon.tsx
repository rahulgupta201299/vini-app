import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/theme';

/** Placeholder used by the tabs that are not designed yet */
export function ComingSoon({
  title,
  icon,
  note,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  note: string;
}) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.center}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={40} color={colors.primary} />
        </View>
        <Text style={styles.title}>Coming soon</Text>
        <Text style={styles.note}>{note}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  heading: { fontSize: 24, fontWeight: '900', color: colors.ink, paddingHorizontal: 16, paddingTop: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: '800', color: colors.ink },
  note: { fontSize: 14, color: colors.muted, textAlign: 'center', marginTop: 6, lineHeight: 20 },
});
