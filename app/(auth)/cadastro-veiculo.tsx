import { router } from 'expo-router';
import { useState } from 'react';

import { Button } from '@/src/components/Button';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { useUserProfile } from '@/src/context/UserProfileContext';

export default function CadastroVeiculoScreen() {
  const [truckType, setTruckType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const { updateVehicleData } = useUserProfile();

  function handleFinish() {
    updateVehicleData({
      truckType: truckType.trim(),
      brand: brand.trim(),
      model: model.trim(),
    });
    router.push('/cadastro-concluido');
  }

  return (
    <Screen>
      <Header title="Seu caminhao" subtitle="Esses dados ajudam nos calculos de custo por viagem." />
      <Input
        label="Tipo de caminhao"
        placeholder="Truck, carreta, bitrem..."
        value={truckType}
        onChangeText={setTruckType}
      />
      <Input
        label="Marca"
        placeholder="Volvo, Scania, Mercedes-Benz..."
        value={brand}
        onChangeText={setBrand}
      />
      <Input
        label="Modelo"
        placeholder="Modelo do veiculo"
        value={model}
        onChangeText={setModel}
      />
      <Input label="Ano" placeholder="2020" keyboardType="number-pad" />
      <Input label="Placa opcional" placeholder="ABC1D23" autoCapitalize="characters" />
      <Input
        label="Capacidade aproximada de carga opcional"
        placeholder="Ex: 14 toneladas"
        keyboardType="decimal-pad"
      />
      <Button title="Finalizar cadastro" onPress={handleFinish} />
    </Screen>
  );
}
