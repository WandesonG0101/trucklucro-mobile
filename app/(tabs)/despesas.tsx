import { StyleSheet, Text } from 'react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';
import { formatCurrency } from '@/src/utils/formatters';

const expenses = [
  { label: 'Diesel', value: 0 },
  { label: 'Pedágios', value: 0 },
  { label: 'Manutenção', value: 0 },
];

export default function DespesasScreen() {
  return (
    <Screen>
      <Header title="Despesas" subtitle="Controle inicial de custos para acompanhar seu lucro real." />
      {expenses.map((expense) => (
        <Card key={expense.label} style={styles.row}>
          <Text style={styles.label}>{expense.label}</Text>
          <Text style={styles.value}>{formatCurrency(expense.value)}</Text>
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
  label: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  value: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '900',
  },
});
