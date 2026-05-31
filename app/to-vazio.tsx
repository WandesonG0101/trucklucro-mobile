import { StyleSheet, Text } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

export default function ToVazioScreen() {
  return (
    <Screen>
      <Header title="To Vazio" subtitle="Avise sua regiao atual para encontrar fretes de retorno." />
      <Card style={styles.card}>
        <Text style={styles.text}>Informe onde voce esta e para onde prefere seguir.</Text>
      </Card>
      <Input label="Estou em" placeholder="Cidade atual" />
      <Input label="Quero ir para" placeholder="Destino preferido" />
      <Button title="Buscar fretes de retorno" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 22,
  },
});
