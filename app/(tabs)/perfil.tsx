import { StyleSheet, Text } from 'react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

export default function PerfilScreen() {
  return (
    <Screen>
      <Header title="Perfil" subtitle="Dados iniciais do motorista e do veiculo." />
      <Card style={styles.card}>
        <Text style={styles.name}>Motorista TruckLucro</Text>
        <Text style={styles.text}>Caminhao: Truck bau</Text>
        <Text style={styles.text}>Consumo medio: 3,2 km/l</Text>
        <Text style={styles.text}>Cidade base: Campinas, SP</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
  },
  name: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
});
