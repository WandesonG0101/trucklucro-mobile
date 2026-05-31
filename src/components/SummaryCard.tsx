import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';

type SummaryCardProps = {
  label: string;
  value: string;
  variant?: 'profit' | 'default';
};

export function SummaryCard({ label, value, variant = 'default' }: SummaryCardProps) {
  const isProfit = variant === 'profit';

  return (
    <View style={[styles.card, isProfit && styles.profitCard]}>
      <Text style={[styles.label, isProfit && styles.profitText]}>{label}</Text>
      <Text style={[styles.value, isProfit && styles.profitText]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 96,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 16,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  profitCard: {
    borderColor: colors.green,
    backgroundColor: colors.green,
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
  },
  value: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  profitText: {
    color: colors.white,
  },
});
