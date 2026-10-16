import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/constants/theme';
import { HomeHeader, SearchRow } from '@/components/home/HomeHeader';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { QuickTiles } from '@/components/home/QuickTiles';
import { FreeBatch } from '@/components/home/FreeBatch';
import { MarketingBanner } from '@/components/home/MarketingBanner';
import { PopularCourses } from '@/components/home/PopularCourses';
import { EShorts } from '@/components/home/EShorts';
import { SpecialProgram } from '@/components/home/SpecialProgram';
import { StudentLove } from '@/components/home/StudentLove';
import { CallbackSection } from '@/components/home/CallbackSection';

/**
 * HOME SCREEN – follows the hand-drawn layout, top to bottom:
 * header → search/study → hero banner → quick tiles → free batch →
 * marketing banner → popular courses → eShorts → special program →
 * student love → call back
 */
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <HomeHeader />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.top}>
          <SearchRow />
          <HeroCarousel />
          <View style={{ height: 18 }} />
          <QuickTiles />
        </View>

        <View style={styles.sections}>
          <FreeBatch />
          <MarketingBanner />
          <PopularCourses />
          <EShorts />
          <SpecialProgram />
          <StudentLove />
          <CallbackSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 36 },
  top: {
    backgroundColor: colors.surface,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  sections: { gap: spacing.section, paddingTop: 24 },
});
