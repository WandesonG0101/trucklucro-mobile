import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';
import type { FreightCalculationParams } from '@/src/types';
import { calculateFreightProfit, type FreightProfitResult } from '@/src/utils/calculateFreightProfit';
import { formatCurrency, formatKm } from '@/src/utils/formatters';

type FormState = {
  freightValue: string;
  distanceKm: string;
  toll: string;
  cargoType: string;
  vehicleType: string;
  origin: string;
  destination: string;
  averageConsumption: string;
  dieselPrice: string;
  food: string;
  otherCosts: string;
};

const emptyForm: FormState = {
  freightValue: '',
  distanceKm: '',
  toll: '',
  cargoType: '',
  vehicleType: '',
  origin: '',
  destination: '',
  averageConsumption: '',
  dieselPrice: '',
  food: '',
  otherCosts: '',
};

export default function CalcularFreteScreen() {
  const params = useLocalSearchParams<FreightCalculationParams>();
  const freightContext = useMemo(() => parseFreightContext(params), [params]);
  const [form, setForm] = useState<FormState>(() => ({
    ...emptyForm,
    freightValue: params.freightValue ?? '',
    distanceKm: params.distanceKm ?? '',
    toll: params.tollValue ?? '',
    cargoType: params.cargoType ?? '',
    vehicleType: params.vehicleType ?? '',
    origin: formatPlace(params.originCity, params.originState),
    destination: formatPlace(params.destinationCity, params.destinationState),
  }));
  const [result, setResult] = useState<FreightProfitResult | null>(null);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleCalculate() {
    setResult(
      calculateFreightProfit({
        freightValue: parseNumber(form.freightValue),
        distanceKm: parseNumber(form.distanceKm),
        truckConsumptionKmPerLiter: parseNumber(form.averageConsumption),
        dieselPrice: parseNumber(form.dieselPrice),
        tollValue: parseNumber(form.toll),
        foodCost: parseNumber(form.food),
        otherCosts: parseNumber(form.otherCosts),
        anttMinimumValue: freightContext.anttMinimumValue,
        historicalAverageValue: freightContext.historicalAverageValue,
      }),
    );
  }

  return (
    <Screen>
      <Header title="Calcular Frete" subtitle="Simule custo, lucro liquido e lucro por km." />

      {freightContext.hasFreight ? (
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Frete selecionado</Text>
          <Text style={styles.carrier}>{freightContext.carrierName}</Text>
          <Text style={styles.route}>{freightContext.route}</Text>
          <View style={styles.summaryGrid}>
            <SummaryItem label="Carga" value={freightContext.cargoType} />
            <SummaryItem label="Veículo" value={freightContext.vehicleType} />
            <SummaryItem
              label="Distância"
              value={freightContext.distanceKm ? formatKm(freightContext.distanceKm) : 'Informe no formulário'}
            />
            <SummaryItem
              label="Valor"
              value={
                freightContext.freightValue
                  ? formatCurrency(freightContext.freightValue)
                  : 'Valor a combinar'
              }
            />
          </View>
          {freightContext.valueWarning ? <Text style={styles.warning}>{freightContext.valueWarning}</Text> : null}
          {freightContext.distanceWarning ? (
            <Text style={styles.warning}>{freightContext.distanceWarning}</Text>
          ) : null}
        </Card>
      ) : null}

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
        label="Origem"
        placeholder="Cidade - UF"
        value={form.origin}
        onChangeText={(value) => updateField('origin', value)}
      />
      <Input
        label="Destino"
        placeholder="Cidade - UF"
        value={form.destination}
        onChangeText={(value) => updateField('destination', value)}
      />
      <Input
        label="Tipo de carga"
        placeholder="Ex: Carga Geral"
        value={form.cargoType}
        onChangeText={(value) => updateField('cargoType', value)}
      />
      <Input
        label="Tipo de veiculo"
        placeholder="Ex: Bitrem"
        value={form.vehicleType}
        onChangeText={(value) => updateField('vehicleType', value)}
      />
      <Input
        label="Pedagio"
        placeholder="R$ 0,00"
        keyboardType="decimal-pad"
        value={form.toll}
        onChangeText={(value) => updateField('toll', value)}
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
          <ResultLine label="Custo com diesel" value={formatCurrency(result.fuelCost)} />
          <ResultLine label="Custo estimado" value={formatCurrency(result.totalCost)} />
          <ResultLine label="Lucro liquido" value={formatCurrency(result.netProfit)} />
          <ResultLine label="Lucro por km" value={formatCurrency(result.profitPerKm)} />
          <ComparisonLine
            label="Mínimo ANTT estimado"
            difference={result.differenceFromAntt}
            percentage={result.percentageFromAntt}
          />
          <ComparisonLine
            label="Média histórica da rota"
            difference={result.differenceFromHistory}
            percentage={result.percentageFromHistory}
          />
        </Card>
      ) : null}
    </Screen>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
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

function ComparisonLine({
  label,
  difference,
  percentage,
}: {
  label: string;
  difference: number | null;
  percentage: number | null;
}) {
  if (difference === null || percentage === null) {
    return null;
  }

  const direction = difference >= 0 ? 'acima' : 'abaixo';

  return (
    <Text style={styles.resultLine}>
      <Text style={styles.resultLabel}>{label}: </Text>
      {formatCurrency(Math.abs(difference))} {direction} ({Math.abs(percentage).toLocaleString('pt-BR', {
        maximumFractionDigits: 1,
      })}%)
    </Text>
  );
}

function parseNumber(value?: string | string[]) {
  const rawValue = Array.isArray(value) ? value[0] : value;

  return Number(String(rawValue ?? '').replace(',', '.')) || 0;
}

function formatPlace(city?: string, state?: string) {
  if (!city && !state) {
    return '';
  }

  return [city, state].filter(Boolean).join(' - ');
}

function parseFreightContext(params: FreightCalculationParams) {
  const freightValue = parseNumber(params.freightValue);
  const distanceKm = parseNumber(params.distanceKm);

  return {
    hasFreight: Boolean(params.freightId),
    carrierName: params.carrierName ?? 'Transportadora parceira',
    route: `${formatPlace(params.originCity, params.originState)} > ${formatPlace(
      params.destinationCity,
      params.destinationState,
    )}`,
    cargoType: params.cargoType ?? 'Nao informado',
    vehicleType: params.vehicleType ?? 'Nao informado',
    freightValue,
    distanceKm,
    anttMinimumValue: parseNumber(params.anttMinimumValue),
    historicalAverageValue: parseNumber(params.historicalAverageValue),
    valueWarning: params.freightId && !params.freightValue
      ? 'Este frete esta com valor a combinar. Informe o valor negociado para calcular o lucro.'
      : '',
    distanceWarning: params.freightId && !params.distanceKm
      ? 'Informe a distancia aproximada para calcular melhor seus custos.'
      : '',
  };
}

const styles = StyleSheet.create({
  summaryCard: {
    gap: 10,
    borderColor: colors.primary,
  },
  summaryTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  carrier: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  route: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  summaryItem: {
    width: '48%',
    gap: 3,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  summaryValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },
  warning: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
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
