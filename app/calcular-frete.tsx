import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';
import { calculateProfit } from '@/src/utils/calculateProfit';
import { formatCurrency } from '@/src/utils/formatters';

type FormState = {
  freightValue: string;
  distanceKm: string;
  averageConsumption: string;
  dieselPrice: string;
  toll: string;
  food: string;
  otherCosts: string;
};

const initialForm: FormState = {
  freightValue: '',
  distanceKm: '',
  averageConsumption: '',
  dieselPrice: '',
  toll: '',
  food: '',
  otherCosts: '',
};

export default function CalcularFreteScreen() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState<ReturnType<typeof calculateProfit> | null>(null);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function parseNumber(value: string) {
    return Number(value.replace(',', '.')) || 0;
  }

  function handleCalculate() {
    setResult(
      calculateProfit({
        freightValue: parseNumber(form.freightValue),
        distanceKm: parseNumber(form.distanceKm),
        averageConsumption: parseNumber(form.averageConsumption),
        dieselPrice: parseNumber(form.dieselPrice),
        toll: parseNumber(form.toll),
        food: parseNumber(form.food),
        otherCosts: parseNumber(form.otherCosts),
      }),
    );
  }

  return (
    <Screen>
      <Header title="Calcular Frete" subtitle="Simule custo, lucro liquido e lucro por km." />
      <Input
        label="Valor do frete"
        placeholder="R$ 0,00"
        keyboardType="decimal-pad"
        value={form.freightValue}
        onChangeText={(value) => updateField('freightValue', value)}
      />
      <Input
        label="Distancia em km"
        placeholder="0"
        keyboardType="decimal-pad"
        value={form.distanceKm}
        onChangeText={(value) => updateField('distanceKm', value)}
      />
      <Input
        label="Consumo medio do caminhao"
        placeholder="Km por litro"
        keyboardType="decimal-pad"
        value={form.averageConsumption}
        onChangeText={(value) => updateField('averageConsumption', value)}
      />
      <Input
        label="Preco do diesel"
        placeholder="R$ por litro"
        keyboardType="decimal-pad"
        value={form.dieselPrice}
        onChangeText={(value) => updateField('dieselPrice', value)}
      />
      <Input
        label="Pedagio"
        placeholder="R$ 0,00"
        keyboardType="decimal-pad"
        value={form.toll}
        onChangeText={(value) => updateField('toll', value)}
      />
      <Input
        label="Alimentacao"
        placeholder="R$ 0,00"
        keyboardType="decimal-pad"
        value={form.food}
        onChangeText={(value) => updateField('food', value)}
      />
      <Input
        label="Outros custos"
        placeholder="R$ 0,00"
        keyboardType="decimal-pad"
        value={form.otherCosts}
        onChangeText={(value) => updateField('otherCosts', value)}
      />
      <Button title="Calcular" onPress={handleCalculate} />

      {result ? (
        <Card style={styles.resultCard}>
          <Text style={styles.resultTitle}>Resultado estimado</Text>
          <ResultLine label="Custo estimado" value={formatCurrency(result.estimatedCost)} />
          <ResultLine label="Lucro liquido" value={formatCurrency(result.netProfit)} />
          <ResultLine label="Lucro por km" value={formatCurrency(result.profitPerKm)} />
        </Card>
      ) : null}
    </Screen>
  );
}

function ResultLine({ label, value }: { label: string; value: string }) {
  return (
    <Text style={styles.resultLine}>
      <Text style={styles.resultLabel}>{label}: </Text>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  resultCard: {
    gap: 8,
    borderColor: colors.green,
  },
  resultTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  resultLine: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
  resultLabel: {
    fontWeight: '800',
  },
});
