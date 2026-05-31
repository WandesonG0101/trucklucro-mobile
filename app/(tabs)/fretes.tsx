import { StyleSheet, Text } from 'react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { freights } from '@/src/data';
import { colors } from '@/src/theme/colors';
import { formatCurrency, formatKm } from '@/src/utils/formatters';

export default function FretesScreen() {
  return (
    <Screen>
      <Header title="Fretes" subtitle="Oportunidades mockadas para testar a navegacao inicial." />
      {freights.map((freight) => (
        <Card key={freight.id} style={styles.freightCard}>
          <Text style={styles.route}>{freight.origin} → {freight.destination}</Text>
          <Text style={styles.meta}>{freight.vehicleType} • {formatKm(freight.distanceKm)}</Text>
          <Text style={styles.value}>{formatCurrency(freight.value)}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  freightCard: {
    gap: 8,
  },
  route: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
  },
  value: {
    color: colors.greenDark,
    fontSize: 18,
    fontWeight: '900',
  },
});
