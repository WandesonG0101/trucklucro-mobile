import { StyleSheet, Text } from 'react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

const dieselPrices = [
  { city: 'Campinas, SP', price: 5.89 },
  { city: 'Uberlandia, MG', price: 5.74 },
  { city: 'Curitiba, PR', price: 5.95 },
];

export default function PrecoDieselScreen() {
  return (
    <Screen>
      <Header title="Preco do Diesel" subtitle="Valores mockados para apoiar os calculos iniciais." />
      {dieselPrices.map((item) => (
        <Card key={item.city} style={styles.row}>
          <Text style={styles.city}>{item.city}</Text>
          <Text style={styles.price}>R$ {item.price.toFixed(2).replace('.', ',')}/L</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  city: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  price: {
    color: colors.greenDark,
    fontSize: 17,
    fontWeight: '900',
  },
});
