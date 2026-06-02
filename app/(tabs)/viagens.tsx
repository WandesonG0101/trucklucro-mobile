import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { useTrips } from '@/src/context/TripsContext';
import { colors } from '@/src/theme/colors';
import type { Trip } from '@/src/types';
import { formatCurrency, formatKm } from '@/src/utils/formatters';

type PeriodFilter = 'all' | 'week' | 'month' | 'year';

const periodOptions: { id: PeriodFilter; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'week', label: 'Semana' },
  { id: 'month', label: 'Mes' },
  { id: 'year', label: 'Ano' },
];

export default function ViagensScreen() {
  const { trips } = useTrips();
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');

  const filteredTrips = useMemo(
    () => trips.filter((trip) => isTripInPeriod(trip, periodFilter)),
    [periodFilter, trips],
  );
  const dashboard = useMemo(() => getDashboardMetrics(filteredTrips), [filteredTrips]);

  return (
    <Screen>
      <Header title="Minhas Viagens" subtitle="Acompanhe transportadora, rota, veiculo e despesas." />

      <Card style={styles.dashboardCard}>
        <View style={styles.dashboardHeader}>
          <View>
            <Text style={styles.dashboardTitle}>Dashboard financeiro</Text>
            <Text style={styles.dashboardSubtitle}>{filteredTrips.length} viagens no periodo</Text>
          </View>
          <View style={styles.marginBadge}>
            <Text style={styles.marginLabel}>Margem media</Text>
            <Text style={styles.marginValue}>{formatPercentage(dashboard.averageMargin)}</Text>
          </View>
        </View>

        <View style={styles.periodChips}>
          {periodOptions.map((option) => (
            <PeriodChip
              key={option.id}
              label={option.label}
              selected={periodFilter === option.id}
              onPress={() => setPeriodFilter(option.id)}
            />
          ))}
        </View>

        <View style={styles.metricGrid}>
          <MetricCard label="Faturamento total" value={formatCurrency(dashboard.totalRevenue)} />
          <MetricCard label="Despesas totais" value={formatCurrency(dashboard.totalCost)} />
          <MetricCard label="Lucro liquido" value={formatCurrency(dashboard.totalProfit)} highlight />
          <MetricCard label="Margem media" value={formatPercentage(dashboard.averageMargin)} />
        </View>
      </Card>

      <Button title="Registrar nova viagem" variant="secondary" onPress={() => router.push('/adicionar')} />

      {filteredTrips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}

      {!filteredTrips.length ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nenhuma viagem nesse periodo</Text>
          <Text style={styles.emptyText}>Registre uma viagem ou altere o filtro para ver outros resultados.</Text>
        </Card>
      ) : null}
    </Screen>
  );
}

function PeriodChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.periodChip, selected && styles.periodChipSelected]}>
      <Text style={[styles.periodChipText, selected && styles.periodChipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function MetricCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={[styles.metricCard, highlight && styles.metricCardHighlight]}>
      <Text style={[styles.metricLabel, highlight && styles.metricLabelHighlight]}>{label}</Text>
      <Text style={[styles.metricValue, highlight && styles.metricValueHighlight]}>{value}</Text>
    </View>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  const expenses = trip.expenses ?? [];
  const profit = trip.revenue - trip.cost;

  return (
    <Card style={styles.tripCard}>
      <View style={styles.cardHeader}>
        <View style={styles.routeBlock}>
          <Text style={styles.route}>
            {trip.origin} {'->'} {trip.destination}
          </Text>
          <Text style={styles.meta}>{trip.date} • {formatKm(trip.distanceKm)}</Text>
        </View>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{profit >= 0 ? 'Lucro' : 'Prejuizo'}</Text>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <InfoItem label="Transportadora" value={trip.carrierName || 'Nao informada'} />
        <InfoItem label="Veiculo" value={formatVehicle(trip)} />
        <InfoItem label="Carga" value={trip.cargoType || 'Nao informada'} />
        <InfoItem label="Frete" value={formatCurrency(trip.revenue)} />
        <InfoItem label="Despesas" value={formatCurrency(trip.cost)} />
        <InfoItem label="Resultado" value={formatCurrency(profit)} highlight />
      </View>

      {expenses.length ? (
        <View style={styles.expensesBox}>
          <Text style={styles.expensesTitle}>Despesas registradas</Text>
          {expenses.map((expense) => (
            <View key={expense.id} style={styles.expenseLine}>
              <Text style={styles.expenseLabel}>
                {expense.category}
                {expense.description ? ` - ${expense.description}` : ''}
              </Text>
              <Text style={styles.expenseValue}>{formatCurrency(expense.value)}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

function InfoItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, highlight && styles.infoHighlight]}>{value}</Text>
    </View>
  );
}

function formatVehicle(trip: Trip) {
  const vehicle = [trip.vehicleType, trip.vehicleModel].filter(Boolean).join(' ');

  return vehicle || 'Nao informado';
}

function getDashboardMetrics(trips: Trip[]) {
  const totalRevenue = trips.reduce((total, trip) => total + trip.revenue, 0);
  const totalCost = trips.reduce((total, trip) => total + trip.cost, 0);
  const totalProfit = totalRevenue - totalCost;
  const averageMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  return {
    totalRevenue,
    totalCost,
    totalProfit,
    averageMargin,
  };
}

function isTripInPeriod(trip: Trip, period: PeriodFilter) {
  if (period === 'all') {
    return true;
  }

  const tripDate = parseBrazilianDate(trip.date);

  if (!tripDate) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (period === 'week') {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    return tripDate >= weekStart && tripDate <= today;
  }

  if (period === 'month') {
    return tripDate.getMonth() === today.getMonth() && tripDate.getFullYear() === today.getFullYear();
  }

  return tripDate.getFullYear() === today.getFullYear();
}

function parseBrazilianDate(date: string) {
  const [day, month, year] = date.split('/').map(Number);

  if (!day || !month || !year) {
    return null;
  }

  const parsedDate = new Date(year, month - 1, day);
  parsedDate.setHours(0, 0, 0, 0);

  return parsedDate;
}

function formatPercentage(value: number) {
  return `${value.toLocaleString('pt-BR', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`;
}

const styles = StyleSheet.create({
  dashboardCard: {
    gap: 16,
    borderColor: colors.primary,
  },
  dashboardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  dashboardTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  dashboardSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
  },
  marginBadge: {
    alignItems: 'flex-end',
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  marginLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
  },
  marginValue: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  periodChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  periodChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  periodChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  periodChipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '900',
  },
  periodChipTextSelected: {
    color: colors.white,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    width: '48%',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 12,
  },
  metricCardHighlight: {
    borderColor: colors.green,
    backgroundColor: colors.green,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  metricLabelHighlight: {
    color: colors.white,
    opacity: 0.9,
  },
  metricValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  metricValueHighlight: {
    color: colors.white,
  },
  emptyCard: {
    gap: 6,
    alignItems: 'center',
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
    textAlign: 'center',
    lineHeight: 20,
  },
  tripCard: {
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  routeBlock: {
    flex: 1,
    gap: 5,
  },
  route: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 23,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  statusPill: {
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoItem: {
    width: '48%',
    gap: 3,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  infoValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },
  infoHighlight: {
    color: colors.greenDark,
  },
  expensesBox: {
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  expensesTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  expenseLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  expenseLabel: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  expenseValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
});
