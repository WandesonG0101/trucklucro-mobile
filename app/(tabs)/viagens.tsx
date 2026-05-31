import { StyleSheet, Text } from 'react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { trips } from '@/src/data';
import { colors } from '@/src/theme/colors';
import { formatCurrency, formatKm } from '@/src/utils/formatters';

export default function ViagensScreen() {
  return (
    <Screen>
      <Header title="Viagens" subtitle="Historico mockado para acompanhar resultado por rota." />
      {trips.map((trip) => (
        <Card key={trip.id} style={styles.tripCard}>
          <Text style={styles.route}>{trip.origin} → {trip.destination}</Text>
          <Text style={styles.meta}>{trip.date} • {formatKm(trip.distanceKm)}</Text>
          <Text style={styles.profit}>Lucro: {formatCurrency(trip.revenue - trip.cost)}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tripCard: {
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
  profit: {
    color: colors.greenDark,
    fontSize: 16,
    fontWeight: '800',
  },
});
