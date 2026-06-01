import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FreightFilterCard, type FreightStatusFilter } from '@/src/components/FreightFilterCard';
import { FreightOfferCard } from '@/src/components/FreightOfferCard';
import { freightOffers } from '@/src/data';
import { colors } from '@/src/theme/colors';
import type { FreightOffer } from '@/src/types';
import { analyzeFreightOffer } from '@/src/utils/analyzeFreightOffer';

export default function FretesDisponiveisScreen() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<FreightStatusFilter>('todos');

  const offersWithAnalysis = useMemo(
    () =>
      freightOffers.map((offer) => ({
        offer,
        analysis: analyzeFreightOffer({
          freightValue: offer.freightValue,
          anttMinimumValue: offer.estimatedAnttMinimumValue,
          historicalAverageValue: offer.historicalAverageValue,
          tollValue: offer.tollValue,
          distanceKm: offer.distanceKm,
        }),
      })),
    [],
  );

  const filteredOffers = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return offersWithAnalysis.filter(({ offer, analysis }) => {
      const routeText = `${offer.originCity} ${offer.originState} ${offer.destinationCity} ${offer.destinationState}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const search = normalizedSearch
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const matchesSearch = !search || routeText.includes(search);
      const matchesStatus = statusFilter === 'todos' || analysis.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [offersWithAnalysis, searchText, statusFilter]);

  function handleCalculate(offer: FreightOffer) {
    router.push({
      pathname: '/calcular-frete',
      params: {
        freightId: offer.id,
        carrierName: offer.carrierName,
        originCity: offer.originCity,
        originState: offer.originState,
        destinationCity: offer.destinationCity,
        destinationState: offer.destinationState,
        cargoType: offer.cargoType,
        vehicleType: offer.vehicleTypes.join(', '),
        distanceKm: offer.distanceKm ? String(offer.distanceKm) : '',
        freightValue: offer.freightValue === null ? '' : String(offer.freightValue),
        anttMinimumValue: String(offer.estimatedAnttMinimumValue),
        historicalAverageValue: String(offer.historicalAverageValue),
        tollValue: offer.tollValue === null ? '' : String(offer.tollValue),
        weightKg: offer.weightKg ? String(offer.weightKg) : '',
        notes: offer.notes ?? '',
      },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="chevron-left" size={16} color={colors.white} />
        </Pressable>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerTitle}>Fretes Disponíveis</Text>
          <Text style={styles.headerSubtitle}>Ofertas das transportadoras parceiras</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <FontAwesome5 name="truck" size={18} color={colors.text} />
          </View>
          <View style={styles.infoTextBox}>
            <Text style={styles.infoTitle}>Acompanhe as ofertas!</Text>
            <Text style={styles.infoText}>
              Veja os fretes disponíveis, compare os valores e escolha as melhores oportunidades para seu caminhão.
            </Text>
          </View>
        </View>

        <FreightFilterCard
          searchText={searchText}
          selectedStatus={statusFilter}
          onSearchTextChange={setSearchText}
          onStatusChange={setStatusFilter}
        />

        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>Ofertas encontradas</Text>
          <Text style={styles.resultCount}>{filteredOffers.length}</Text>
        </View>

        {filteredOffers.map(({ offer, analysis }) => (
          <FreightOfferCard
            key={offer.id}
            offer={offer}
            analysis={analysis}
            onCalculate={handleCalculate}
          />
        ))}

        {filteredOffers.length === 0 ? (
          <View style={styles.emptyCard}>
            <FontAwesome5 name="search" size={22} color={colors.textMuted} />
            <Text style={styles.emptyText}>Nenhuma oferta encontrada com esses filtros.</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 18,
  },
  backButton: {
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  headerTextBox: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  headerSubtitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.9,
  },
  content: {
    gap: 14,
    padding: 16,
    paddingBottom: 28,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 14,
  },
  infoIcon: {
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: colors.primary,
  },
  infoTextBox: {
    flex: 1,
    gap: 4,
  },
  infoTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  infoText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  resultCount: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  emptyCard: {
    minHeight: 116,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 18,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
});
