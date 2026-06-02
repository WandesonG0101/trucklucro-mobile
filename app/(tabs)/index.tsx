import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { EmptyStateCard } from '@/src/components/EmptyStateCard';
import { HeaderHome } from '@/src/components/HeaderHome';
import { JourneyCard } from '@/src/components/JourneyCard';
import { SectionTitle } from '@/src/components/SectionTitle';
import { SummaryCard } from '@/src/components/SummaryCard';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { colors } from '@/src/theme/colors';
import { formatCurrency } from '@/src/utils/formatters';

export default function HomeScreen() {
  const { personalData, vehicleData } = useUserProfile();
  const revenue = 0;
  const profit = 0;
  const driverName = personalData.fullName || personalData.nickname || 'Motorista';
  const truckModel =
    [vehicleData.truckType, vehicleData.brand, vehicleData.model].filter(Boolean).join(' ') || 'Caminhao';
  const monthLabel = getCurrentMonthLabel();

  return (
    <View style={styles.container}>
      <HeaderHome
        userName={driverName}
        truckModel={truckModel}
        monthLabel={monthLabel}
        tripCount={0}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Resumo do Mês" icon="cash-outline" />
        <View style={styles.summaryRow}>
          <SummaryCard label="Lucro Líquido" value={formatCurrency(profit)} variant="profit" />
          <SummaryCard label="Faturamento" value={formatCurrency(revenue)} />
        </View>

        <SectionTitle title="Seu Itinerário" />
        <View style={styles.journeyGrid}>
          <JourneyCard
            title="Fretes Disponíveis"
            icon="truck"
            iconLibrary="fontawesome5"
            badge="170"
            onPress={() => router.push('/fretes-disponiveis')}
          />
          <JourneyCard
            title="Tô Vazio"
            icon="truck-loading"
            iconLibrary="fontawesome5"
            onPress={() => router.push('/to-vazio')}
          />
          <JourneyCard
            title="Preços Diesel"
            icon="gas-pump"
            iconLibrary="fontawesome5"
            onPress={() => router.push('/preco-diesel')}
          />
          <JourneyCard
            title="Parceiros TruckLucro"
            icon="handshake"
            iconLibrary="fontawesome5"
            onPress={() => router.push('/parceiros')}
          />
          <JourneyCard
            title="Calcular Frete"
            icon="calculator"
            iconLibrary="fontawesome5"
            onPress={() => router.push('/calcular-frete')}
          />
          <JourneyCard
            title="Serviços"
            icon="tools"
            iconLibrary="fontawesome5"
            onPress={() => router.push('/servicos')}
          />
        </View>

        <View style={styles.receivablesCard}>
          <View style={styles.receivablesLeft}>
            <Ionicons name="calendar-outline" size={24} color={colors.primary} />
            <Text style={styles.receivablesText}>Próximos Recebimentos</Text>
          </View>
          <Ionicons name="chevron-down" size={22} color={colors.textMuted} />
        </View>

        <EmptyStateCard message="Sem viagens este mês" />
      </ScrollView>
    </View>
  );
}

function getCurrentMonthLabel() {
  const label = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return label.charAt(0).toUpperCase() + label.slice(1);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: 18,
    padding: 20,
    paddingBottom: 28,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  journeyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  receivablesCard: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  receivablesLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  receivablesText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
});
