import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { colors } from '@/src/theme/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="viagens"
        options={{
          title: 'Minhas Viagens',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="comunidade"
        options={{
          title: 'Comunidade',
          tabBarIcon: ({ color }) => (
            <View>
              <Ionicons size={24} name="chatbubbles" color={color} />
              <Badge label="99+" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="despesas"
        options={{
          title: 'Despesas',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="receipt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person" color={color} />,
        }}
      />
      <Tabs.Screen name="adicionar" options={{ href: null }} />
      <Tabs.Screen name="fretes" options={{ href: null }} />
    </Tabs>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingTop: 8,
    paddingBottom: 8,
    elevation: 10,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '800',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -18,
    minWidth: 28,
    borderRadius: 999,
    backgroundColor: colors.badge,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
  },
});
