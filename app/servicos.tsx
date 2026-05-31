import { StyleSheet, Text } from 'react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

const services = ['Seguro de carga', 'Manutencao preventiva', 'Consulta de pedagios', 'Controle de documentos'];

export default function ServicosScreen() {
  return (
    <Screen>
      <Header title="Servicos" subtitle="Ferramentas planejadas para apoiar a rotina do motorista." />
      {services.map((service) => (
        <Card key={service}>
          <Text style={styles.service}>{service}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  service: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
});
