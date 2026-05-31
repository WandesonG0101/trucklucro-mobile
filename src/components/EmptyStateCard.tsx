import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/src/theme/colors';

type EmptyStateCardProps = {
  message: string;
};

export function EmptyStateCard({ message }: EmptyStateCardProps) {
  return (
    <View style={styles.card}>
      <Ionicons name="alert-circle-outline" size={28} color={colors.textMuted} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 104,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 18,
  },
  message: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '800',
  },
});
