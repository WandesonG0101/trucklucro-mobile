import { StyleSheet, Text } from 'react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { freights } from '@/src/data';
import { colors } from '@/src/theme/colors';
import { formatCurrency, formatKm } from '@/src/utils/formatters';

export default function FretesDisponiveisScreen() {
  return (
    <Screen>
      <Header title="Fretes Disponiveis" subtitle="Lista inicial de fretes para avaliar antes de aceitar." />
      {freights.map((freight) => (
        <Card key={freight.id} style={styles.card}>
          <Text style={styles.route}>{freight.origin} → {freight.destination}</Text>
          <Text style={styles.meta}>{freight.vehicleType} • {formatKm(freight.distanceKm)}</Text>
          <Text style={styles.value}>{formatCurrency(freight.value)}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
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
