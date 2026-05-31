import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/src/theme/colors';

type JourneyCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  badge?: string;
  onPress?: () => void;
};

export function JourneyCard({ title, icon, badge, onPress }: JourneyCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
      <Ionicons name={icon} size={38} color={colors.text} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: '48%',
    minHeight: 132,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    padding: 14,
    elevation: 3,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    minWidth: 34,
    borderRadius: 999,
    backgroundColor: colors.badge,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
});
