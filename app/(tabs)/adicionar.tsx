import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { useTrips } from '@/src/context/TripsContext';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { colors } from '@/src/theme/colors';
import type { TripExpense } from '@/src/types';
import { formatCurrency } from '@/src/utils/formatters';

type ExpenseForm = {
  category: string;
  description: string;
  value: string;
};

const initialExpenseForm: ExpenseForm = {
  category: '',
  description: '',
  value: '',
};

export default function AdicionarScreen() {
  const { addTrip } = useTrips();
  const { vehicleData } = useUserProfile();
  const defaultVehicleModel = [vehicleData.brand, vehicleData.model].filter(Boolean).join(' ');
  const [carrierName, setCarrierName] = useState('');
  const [vehicleType, setVehicleType] = useState(vehicleData.truckType);
  const [vehicleModel, setVehicleModel] = useState(defaultVehicleModel);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [revenue, setRevenue] = useState('');
  const [distanceKm, setDistanceKm] = useState('');
  const [expenseForm, setExpenseForm] = useState(initialExpenseForm);
  const [expenses, setExpenses] = useState<TripExpense[]>([]);

  const totalExpenses = useMemo(
    () => expenses.reduce((total, expense) => total + expense.value, 0),
    [expenses],
  );
  const estimatedProfit = parseNumber(revenue) - totalExpenses;

  function updateExpenseField(field: keyof ExpenseForm, value: string) {
    setExpenseForm((current) => ({ ...current, [field]: value }));
  }

  function handleAddExpense() {
    const value = parseNumber(expenseForm.value);

    if (!expenseForm.category.trim() || value <= 0) {
      Alert.alert('Despesa incompleta', 'Informe a categoria e o valor da despesa.');
      return;
    }

    setExpenses((current) => [
      ...current,
      {
        id: String(Date.now()),
        category: expenseForm.category.trim(),
        description: expenseForm.description.trim(),
        value,
      },
    ]);
    setExpenseForm(initialExpenseForm);
  }

  function handleRemoveExpense(expenseId: string) {
    setExpenses((current) => current.filter((expense) => expense.id !== expenseId));
  }

  function handleSaveTrip() {
    if (!origin.trim() || !destination.trim() || !carrierName.trim()) {
      Alert.alert('Dados obrigatorios', 'Informe transportadora, origem e destino para salvar a viagem.');
      return;
    }

    addTrip({
      origin: origin.trim(),
      destination: destination.trim(),
      date: date.trim() || new Date().toLocaleDateString('pt-BR'),
      revenue: parseNumber(revenue),
      cost: totalExpenses,
      distanceKm: parseNumber(distanceKm),
      carrierName: carrierName.trim(),
      vehicleType: vehicleType.trim(),
      vehicleModel: vehicleModel.trim(),
      cargoType: cargoType.trim(),
      expenses,
    });
    router.push('/viagens');
  }

  return (
    <Screen>
      <Header title="Adicionar viagem" subtitle="Registre frete, veiculo e despesas dessa rota." />

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Dados do veiculo</Text>
        <Input
          label="Tipo de veiculo"
          placeholder="Truck, carreta, bitrem..."
          value={vehicleType}
          onChangeText={setVehicleType}
        />
        <Input
          label="Marca e modelo"
          placeholder="Ex: Scania R540"
          value={vehicleModel}
          onChangeText={setVehicleModel}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Dados da viagem</Text>
        <Input
          label="Transportadora"
          placeholder="Nome da transportadora"
          value={carrierName}
          onChangeText={setCarrierName}
        />
        <Input label="Origem" placeholder="Cidade - UF" value={origin} onChangeText={setOrigin} />
        <Input label="Destino" placeholder="Cidade - UF" value={destination} onChangeText={setDestination} />
        <Input label="Data da viagem" placeholder="DD/MM/AAAA" value={date} onChangeText={setDate} />
        <Input label="Tipo de carga" placeholder="Carga geral, graos, paletizada..." value={cargoType} onChangeText={setCargoType} />
        <Input
          label="Valor do frete"
          placeholder="R$ 0,00"
          keyboardType="decimal-pad"
          value={revenue}
          onChangeText={setRevenue}
        />
        <Input
          label="Distancia em km"
          placeholder="0"
          keyboardType="decimal-pad"
          value={distanceKm}
          onChangeText={setDistanceKm}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Despesas da viagem</Text>
        <Text style={styles.sectionDescription}>Adicione diesel, pedagio, alimentacao, manutencao ou outros custos.</Text>
        <Input
          label="Categoria"
          placeholder="Diesel, pedagio, alimentacao..."
          value={expenseForm.category}
          onChangeText={(value) => updateExpenseField('category', value)}
        />
        <Input
          label="Descricao opcional"
          placeholder="Ex: Abastecimento em Gurupi"
          value={expenseForm.description}
          onChangeText={(value) => updateExpenseField('description', value)}
        />
        <Input
          label="Valor"
          placeholder="R$ 0,00"
          keyboardType="decimal-pad"
          value={expenseForm.value}
          onChangeText={(value) => updateExpenseField('value', value)}
        />
        <Button title="Adicionar despesa" variant="secondary" onPress={handleAddExpense} />

        {expenses.map((expense) => (
          <View key={expense.id} style={styles.expenseRow}>
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseCategory}>{expense.category}</Text>
              {expense.description ? <Text style={styles.expenseDescription}>{expense.description}</Text> : null}
            </View>
            <View style={styles.expenseRight}>
              <Text style={styles.expenseValue}>{formatCurrency(expense.value)}</Text>
              <Pressable accessibilityRole="button" onPress={() => handleRemoveExpense(expense.id)}>
                <Text style={styles.removeText}>Remover</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </Card>

      <Card style={styles.resultCard}>
        <Text style={styles.resultLabel}>Resumo estimado</Text>
        <View style={styles.resultLine}>
          <Text style={styles.resultText}>Frete</Text>
          <Text style={styles.resultValue}>{formatCurrency(parseNumber(revenue))}</Text>
        </View>
        <View style={styles.resultLine}>
          <Text style={styles.resultText}>Despesas</Text>
          <Text style={styles.resultValue}>{formatCurrency(totalExpenses)}</Text>
        </View>
        <View style={styles.resultLine}>
          <Text style={styles.resultText}>Lucro previsto</Text>
          <Text style={styles.profitValue}>{formatCurrency(estimatedProfit)}</Text>
        </View>
      </Card>

      <Button title="Salvar viagem" onPress={handleSaveTrip} />
    </Screen>
  );
}

function parseNumber(value: string) {
  return Number(value.replace(',', '.')) || 0;
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  sectionDescription: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.background,
    padding: 12,
  },
  expenseInfo: {
    flex: 1,
    gap: 3,
  },
  expenseCategory: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  expenseDescription: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  expenseRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  expenseValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  removeText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '900',
  },
  resultCard: {
    gap: 10,
    borderColor: colors.green,
  },
  resultLabel: {
    color: colors.greenDark,
    fontSize: 16,
    fontWeight: '900',
  },
  resultLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
  },
  resultValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  profitValue: {
    color: colors.greenDark,
    fontSize: 17,
    fontWeight: '900',
  },
});
