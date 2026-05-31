import { StyleSheet, Text } from 'react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { partners } from '@/src/data';
import { colors } from '@/src/theme/colors';

export default function ParceirosScreen() {
  return (
    <Screen>
      <Header title="Parceiros TruckLucro" subtitle="Beneficios mockados para reduzir custo na estrada." />
      {partners.map((partner) => (
        <Card key={partner.id} style={styles.card}>
          <Text style={styles.name}>{partner.name}</Text>
          <Text style={styles.category}>{partner.category}</Text>
          <Text style={styles.benefit}>{partner.benefit}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 6,
  },
  name: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  category: {
    color: colors.greenDark,
    fontWeight: '800',
  },
  benefit: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
  },
});
