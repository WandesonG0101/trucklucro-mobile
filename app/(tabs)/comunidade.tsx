import { StyleSheet, Text } from 'react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

export default function ComunidadeScreen() {
  return (
    <Screen>
      <Header title="Comunidade" subtitle="Espaço para avisos, dicas de rota e novidades do TruckLucro." />
      <Card style={styles.card}>
        <Text style={styles.title}>99+ notificações</Text>
        <Text style={styles.text}>Em breve, conversas e alertas importantes para motoristas.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  text: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
});
