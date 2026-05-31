import { router } from 'expo-router';

import { Button } from '@/src/components/Button';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';

export default function CadastroVeiculoScreen() {
  return (
    <Screen>
      <Header title="Seu caminhao" subtitle="Esses dados ajudam nos calculos de custo por viagem." />
      <Input label="Tipo de caminhao" placeholder="Truck, carreta, bitrem..." />
      <Input label="Marca" placeholder="Volvo, Scania, Mercedes-Benz..." />
      <Input label="Modelo" placeholder="Modelo do veiculo" />
      <Input label="Ano" placeholder="2020" keyboardType="number-pad" />
      <Input label="Placa opcional" placeholder="ABC1D23" autoCapitalize="characters" />
      <Input
        label="Capacidade aproximada de carga opcional"
        placeholder="Ex: 14 toneladas"
        keyboardType="decimal-pad"
      />
      <Button title="Finalizar cadastro" onPress={() => router.push('/cadastro-concluido')} />
    </Screen>
  );
}
