import { Tabs } from 'expo-router/js-tabs';
import { ColorValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/theme';

type IconName = keyof typeof Ionicons.glyphMap;

const tab = (title: string, icon: IconName, activeIcon: IconName) => ({
  title,
  tabBarIcon: ({ color, focused }: { color: ColorValue; focused: boolean }) => (
    <Ionicons name={focused ? activeIcon : icon} size={23} color={color as string} />
  ),
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarStyle: { borderTopColor: colors.line },
      }}
    >
      <Tabs.Screen name="index" options={tab('Home', 'home-outline', 'home')} />
      <Tabs.Screen name="study" options={tab('Study', 'book-outline', 'book')} />
      <Tabs.Screen name="tests" options={tab('Tests', 'clipboard-outline', 'clipboard')} />
      <Tabs.Screen name="store" options={tab('Store', 'bag-handle-outline', 'bag-handle')} />
      <Tabs.Screen name="profile" options={tab('Profile', 'person-circle-outline', 'person-circle')} />
    </Tabs>
  );
}
