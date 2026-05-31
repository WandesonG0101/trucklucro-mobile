import { router } from 'expo-router';

import { Button } from '@/src/components/Button';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';

export default function AdicionarScreen() {
  return (
    <Screen>
      <Header title="Adicionar viagem" subtitle="Registre uma rota para calcular o resultado depois." />
      <Input label="Origem" placeholder="Cidade de origem" />
      <Input label="Destino" placeholder="Cidade de destino" />
      <Input label="Valor do frete" placeholder="R$ 0,00" keyboardType="decimal-pad" />
      <Input label="Distancia em km" placeholder="0" keyboardType="decimal-pad" />
      <Input label="Custos totais" placeholder="R$ 0,00" keyboardType="decimal-pad" />
      <Button title="Salvar viagem mockada" onPress={() => router.push('/viagens')} />
    </Screen>
  );
}
