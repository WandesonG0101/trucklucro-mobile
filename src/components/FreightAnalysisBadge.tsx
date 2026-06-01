import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';
import type { FreightOfferAnalysis, FreightAnalysisStatus } from '@/src/types';

type FreightAnalysisBadgeProps = {
  analysis: FreightOfferAnalysis;
};

const statusColors: Record<FreightAnalysisStatus, { background: string; text: string; border: string }> = {
  bom: {
    background: '#E8F8EF',
    text: colors.greenDark,
    border: colors.green,
  },
  regular: {
    background: colors.surfaceMuted,
    text: colors.primary,
    border: colors.primaryLight,
  },
  baixo: {
    background: '#FEECEB',
    text: colors.danger,
    border: colors.danger,
  },
  a_combinar: {
    background: '#F2EEE8',
    text: colors.textMuted,
    border: colors.border,
  },
};

export function FreightAnalysisBadge({ analysis }: FreightAnalysisBadgeProps) {
  const palette = statusColors[analysis.status];

  return (
    <View style={[styles.badge, { backgroundColor: palette.background, borderColor: palette.border }]}>
      <Text style={[styles.label, { color: palette.text }]}>{analysis.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: '900',
  },
});
