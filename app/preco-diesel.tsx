import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DieselPriceCard } from '@/src/components/DieselPriceCard';
import { anpTocantinsDieselReference, communityDieselPrices } from '@/src/data';
import { colors } from '@/src/theme/colors';
import { calculateCommunityDieselStats } from '@/src/utils/calculateCommunityDieselStats';
import { formatCurrencyShort } from '@/src/utils/formatCurrency';

type DieselTab = 'community' | 'anp';
type DieselSort = 'recent' | 'lowest';

export default function PrecoDieselScreen() {
  const [activeTab, setActiveTab] = useState<DieselTab>('community');
  const [cityFilter, setCityFilter] = useState('');
  const [sortBy, setSortBy] = useState<DieselSort>('recent');

  const filteredPrices = useMemo(() => {
    const normalizedFilter = normalizeText(cityFilter.trim());
    const prices = communityDieselPrices.filter((price) =>
      normalizeText(price.city).includes(normalizedFilter),
    );

    return [...prices].sort((a, b) => {
      if (sortBy === 'lowest') {
        return a.pricePerLiter - b.pricePerLiter;
      }

      return new Date(b.informedAt).getTime() - new Date(a.informedAt).getTime();
    });
  }, [cityFilter, sortBy]);

  const stats = useMemo(() => calculateCommunityDieselStats(filteredPrices), [filteredPrices]);

  function handleAddPress() {
    // TODO: Implementar app/adicionar-preco-diesel.tsx com formulario da comunidade.
    Alert.alert('Adicionar preço', 'Em breve você poderá informar o preço do diesel da sua região.');
  }

  function handleNearMePress() {
    Alert.alert('Perto de mim', 'Busca por localização em breve.');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={17} color={colors.text} />
        </Pressable>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerTitle}>Preços Diesel</Text>
          <Text style={styles.headerSubtitle}>Comunidade e referência ANP no Tocantins</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionTitleRow}>
          <FontAwesome5 name="gas-pump" size={25} color={colors.primary} />
          <Text style={styles.sectionTitle}>Preços Diesel</Text>
        </View>

        <View style={styles.tabs}>
          <TabButton label="Comunidade" active={activeTab === 'community'} onPress={() => setActiveTab('community')} />
          <TabButton label="Preço ANP" active={activeTab === 'anp'} onPress={() => setActiveTab('anp')} />
        </View>

        {activeTab === 'community' ? (
          <View style={styles.tabContent}>
            <View style={styles.addRow}>
              <View style={styles.statsBox}>
                <Text style={styles.statsLabel}>Média da comunidade</Text>
                <Text style={styles.statsValue}>{formatCurrencyShort(stats.averagePrice)}/L</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={handleAddPress} style={styles.addButton}>
                <FontAwesome5 name="plus" size={16} color={colors.text} />
                <Text style={styles.addButtonText}>Adicionar</Text>
              </Pressable>
            </View>

            <Pressable accessibilityRole="button" onPress={handleNearMePress} style={styles.nearMeButton}>
              <FontAwesome5 name="crosshairs" size={18} color={colors.text} />
              <Text style={styles.nearMeText}>Perto de mim</Text>
            </Pressable>

            <View style={styles.filterRow}>
              <View style={styles.filterBox}>
                <FontAwesome5 name="map-marker-alt" size={17} color={colors.textMuted} />
                <TextInput
                  value={cityFilter}
                  onChangeText={setCityFilter}
                  placeholder="Filtrar por cidade..."
                  placeholderTextColor={colors.textMuted}
                  style={styles.filterInput}
                />
                <FontAwesome5 name="search" size={16} color={colors.textMuted} />
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={() => setSortBy((current) => (current === 'recent' ? 'lowest' : 'recent'))}
                style={styles.sortButton}>
                <Text style={styles.sortText}>{sortBy === 'recent' ? 'Mais recentes' : 'Menor preço'}</Text>
                <FontAwesome5 name="chevron-down" size={13} color={colors.textMuted} />
              </Pressable>
            </View>

            <View style={styles.quickStats}>
              <Text style={styles.quickStat}>Menor: {formatCurrencyShort(stats.lowestPrice)}</Text>
              <Text style={styles.quickStat}>Maior: {formatCurrencyShort(stats.highestPrice)}</Text>
              <Text style={styles.quickStat}>{stats.stationCount} postos</Text>
            </View>

            {filteredPrices.map((price) => (
              <DieselPriceCard key={price.id} price={price} />
            ))}

            {filteredPrices.length === 0 ? (
              <View style={styles.emptyCard}>
                <FontAwesome5 name="search" size={22} color={colors.textMuted} />
                <Text style={styles.emptyText}>Nenhum preço encontrado para essa cidade.</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.tabContent}>
            <View style={styles.anpCard}>
              <Text style={styles.anpTitle}>{anpTocantinsDieselReference.sourceLabel}</Text>
              <View style={styles.anpRows}>
                <AnpRow label="Diesel S10 médio" value={`${formatCurrencyShort(anpTocantinsDieselReference.dieselS10Average)}/L`} />
                <AnpRow
                  label="Diesel comum médio"
                  value={`${formatCurrencyShort(anpTocantinsDieselReference.dieselCommonAverage)}/L`}
                />
                <AnpRow label="Região" value={anpTocantinsDieselReference.stateName} />
                <AnpRow label="Última atualização" value="20/05/2026" />
              </View>
              <Text style={styles.notice}>Valores de referência. Consulte o posto antes de abastecer.</Text>
              <Text style={styles.noticeMuted}>
                Dados preparados para futura integração com fonte pública da ANP. No momento, os valores são demonstrativos.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.tabButton, active && styles.tabButtonActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </Pressable>
  );
}

function AnpRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.anpRow}>
      <Text style={styles.anpLabel}>{label}</Text>
      <Text style={styles.anpValue}>{value}</Text>
    </View>
  );
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
  },
  backButton: {
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTextBox: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
  },
  headerSubtitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.8,
  },
  content: {
    gap: 16,
    padding: 18,
    paddingBottom: 30,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
  },
  tabs: {
    flexDirection: 'row',
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
    padding: 3,
  },
  tabButton: {
    minHeight: 58,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: colors.surface,
    elevation: 1,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '800',
  },
  tabTextActive: {
    color: colors.text,
  },
  tabContent: {
    gap: 14,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statsBox: {
    flex: 1,
    gap: 3,
  },
  statsLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  statsValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  addButton: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 14,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  nearMeButton: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  nearMeText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterBox: {
    minHeight: 58,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
  },
  filterInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  sortButton: {
    minHeight: 58,
    width: 142,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
  },
  sortText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  quickStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickStat: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  emptyCard: {
    minHeight: 120,
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
  anpCard: {
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 18,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  anpTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  anpRows: {
    gap: 10,
  },
  anpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  anpLabel: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '800',
  },
  anpValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  notice: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  noticeMuted: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});
