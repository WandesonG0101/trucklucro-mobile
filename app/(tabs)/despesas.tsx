import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { useTrips } from '@/src/context/TripsContext';
import { colors } from '@/src/theme/colors';
import type { Trip } from '@/src/types';
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

const quickCategories = ['Combustivel', 'Pedagio', 'Alimentacao', 'Manutencao', 'Outros'];

export default function DespesasScreen() {
  const { trips, addTripExpense } = useTrips();
  const [selectedTripId, setSelectedTripId] = useState(trips[0]?.id ?? '');
  const [expenseForm, setExpenseForm] = useState(initialExpenseForm);
  const recentTrips = trips.slice(0, 4);
  const selectedTrip = useMemo(
    () => trips.find((trip) => trip.id === selectedTripId) ?? trips[0],
    [selectedTripId, trips],
  );

  function updateExpenseField(field: keyof ExpenseForm, value: string) {
    setExpenseForm((current) => ({ ...current, [field]: value }));
  }

  function handleAddExpense() {
    if (!selectedTrip) {
      return;
    }

    const value = parseNumber(expenseForm.value);

    if (!expenseForm.category.trim() || value <= 0) {
      Alert.alert('Despesa incompleta', 'Informe a categoria e o valor para adicionar a despesa.');
      return;
    }

    addTripExpense(selectedTrip.id, {
      category: expenseForm.category.trim(),
      description: expenseForm.description.trim(),
      value,
    });
    setExpenseForm(initialExpenseForm);
  }

  return (
    <Screen>
      <Header title="Despesas" subtitle="Escolha uma viagem e registre os custos realizados." />

      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Ultimas viagens</Text>
        <Pressable accessibilityRole="button" onPress={() => router.push('/viagens')} style={styles.linkButton}>
          <Text style={styles.linkText}>Ver todas</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </Pressable>
      </View>

      {recentTrips.map((trip) => (
        <TripSelectorCard
          key={trip.id}
          trip={trip}
          selected={selectedTrip?.id === trip.id}
          onPress={() => setSelectedTripId(trip.id)}
        />
      ))}

      {selectedTrip ? (
        <>
          <TripExpenseDashboard trip={selectedTrip} />

          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Adicionar despesa</Text>
            <Text style={styles.sectionDescription}>
              Use as categorias rapidas ou informe outro tipo de custo dessa viagem.
            </Text>
            <View style={styles.categoryChips}>
              {quickCategories.map((category) => (
                <Pressable
                  key={category}
                  accessibilityRole="button"
                  onPress={() => updateExpenseField('category', category)}
                  style={[
                    styles.categoryChip,
                    expenseForm.category === category && styles.categoryChipSelected,
                  ]}>
                  <Text
                    style={[
                      styles.categoryChipText,
                      expenseForm.category === category && styles.categoryChipTextSelected,
                    ]}>
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Input
              label="Categoria"
              placeholder="Ex: Combustivel"
              value={expenseForm.category}
              onChangeText={(value) => updateExpenseField('category', value)}
            />
            <Input
              label="Descricao opcional"
              placeholder="Ex: Abastecimento em Araguaina"
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
            <Button title="Adicionar despesa na viagem" variant="secondary" onPress={handleAddExpense} />
          </Card>

          <Card style={styles.sectionCard}>
            <View style={styles.expenseHeader}>
              <Text style={styles.sectionTitle}>Despesas registradas</Text>
              <Text style={styles.countBadge}>{selectedTrip.expenses?.length ?? 0}</Text>
            </View>
            {(selectedTrip.expenses ?? []).length ? (
              selectedTrip.expenses?.map((expense) => (
                <View key={expense.id} style={styles.expenseItem}>
                  <View style={styles.expenseIcon}>
                    <Ionicons name={getExpenseIcon(expense.category)} size={22} color={colors.primary} />
                  </View>
                  <View style={styles.expenseText}>
                    <Text style={styles.expenseTitle}>{expense.category}</Text>
                    <Text style={styles.expenseMeta}>{expense.description || 'Despesa da viagem'}</Text>
                  </View>
                  <Text style={styles.expenseValue}>{formatCurrency(expense.value)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Nenhuma despesa registrada nessa viagem ainda.</Text>
            )}
          </Card>
        </>
      ) : (
        <Card style={styles.sectionCard}>
          <Text style={styles.emptyTitle}>Nenhuma viagem encontrada</Text>
          <Text style={styles.emptyText}>Registre uma viagem para adicionar despesas.</Text>
        </Card>
      )}
    </Screen>
  );
}

function TripSelectorCard({
  trip,
  selected,
  onPress,
}: {
  trip: Trip;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card style={[styles.tripCard, selected && styles.tripCardSelected]}>
        <View style={styles.tripIcon}>
          <Ionicons name="map" size={22} color={selected ? colors.white : colors.primary} />
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripRoute} numberOfLines={1}>
            {trip.origin} {'->'} {trip.destination}
          </Text>
          <Text style={styles.tripMeta}>
            {trip.date} • {trip.carrierName || 'Transportadora nao informada'}
          </Text>
        </View>
        <View style={styles.tripRight}>
          <Text style={styles.tripCost}>{formatCurrency(trip.cost)}</Text>
          <Text style={styles.tripCostLabel}>despesas</Text>
        </View>
      </Card>
    </Pressable>
  );
}

function TripExpenseDashboard({ trip }: { trip: Trip }) {
  const profit = trip.revenue - trip.cost;
  const margin = trip.revenue > 0 ? (profit / trip.revenue) * 100 : 0;
  const expensesByCategory = getExpensesByCategory(trip);

  return (
    <Card style={styles.dashboardCard}>
      <Text style={styles.dashboardTitle}>Despesas da viagem</Text>
      <Text style={styles.dashboardSubtitle}>
        {trip.origin} {'->'} {trip.destination}
      </Text>

      <View style={styles.metricsGrid}>
        <Metric label="Frete" value={formatCurrency(trip.revenue)} />
        <Metric label="Despesas" value={formatCurrency(trip.cost)} warning />
        <Metric label="Lucro real" value={formatCurrency(profit)} highlight />
        <Metric label="Margem" value={`${margin.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`} />
      </View>

      {expensesByCategory.length ? (
        <View style={styles.categorySummary}>
          <Text style={styles.categorySummaryTitle}>Comparativo por tipo</Text>
          {expensesByCategory.map((item) => (
            <View key={item.category} style={styles.categorySummaryRow}>
              <View style={styles.categorySummaryLeft}>
                <Ionicons name={getExpenseIcon(item.category)} size={22} color={colors.textMuted} />
                <Text style={styles.categorySummaryLabel}>{item.category}</Text>
              </View>
              <Text style={styles.categorySummaryValue}>{formatCurrency(item.value)}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

function Metric({
  label,
  value,
  highlight,
  warning,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  warning?: boolean;
}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, highlight && styles.metricHighlight, warning && styles.metricWarning]}>
        {value}
      </Text>
    </View>
  );
}

function getExpensesByCategory(trip: Trip) {
  const grouped = new Map<string, number>();

  (trip.expenses ?? []).forEach((expense) => {
    grouped.set(expense.category, (grouped.get(expense.category) ?? 0) + expense.value);
  });

  return Array.from(grouped.entries()).map(([category, value]) => ({ category, value }));
}

function getExpenseIcon(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes('combust') || normalized.includes('diesel')) {
    return 'car-outline' as const;
  }

  if (normalized.includes('ped')) {
    return 'card-outline' as const;
  }

  if (normalized.includes('aliment')) {
    return 'restaurant-outline' as const;
  }

  if (normalized.includes('manut')) {
    return 'construct-outline' as const;
  }

  return 'receipt-outline' as const;
}

function parseNumber(value: string) {
  return Number(value.replace(',', '.')) || 0;
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tripCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceMuted,
  },
  tripIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  tripInfo: {
    flex: 1,
    gap: 4,
  },
  tripRoute: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  tripMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  tripRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  tripCost: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  tripCostLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  dashboardCard: {
    gap: 14,
    borderColor: colors.primary,
  },
  dashboardTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  dashboardSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    width: '48%',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 13,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
  },
  metricValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  metricHighlight: {
    color: colors.greenDark,
  },
  metricWarning: {
    color: colors.primary,
  },
  categorySummary: {
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  categorySummaryTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  categorySummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderRadius: 14,
    backgroundColor: colors.background,
    padding: 12,
  },
  categorySummaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categorySummaryLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  categorySummaryValue: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
  },
  sectionCard: {
    gap: 12,
  },
  sectionDescription: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  categoryChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
  },
  categoryChipTextSelected: {
    color: colors.white,
  },
  expenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countBadge: {
    minWidth: 32,
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '900',
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 12,
  },
  expenseIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
  },
  expenseText: {
    flex: 1,
    gap: 3,
  },
  expenseTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  expenseMeta: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  expenseValue: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
});
