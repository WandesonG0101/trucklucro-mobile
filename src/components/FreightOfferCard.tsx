import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { FreightAnalysisBadge } from '@/src/components/FreightAnalysisBadge';
import { colors } from '@/src/theme/colors';
import type { FreightOffer, FreightOfferAnalysis } from '@/src/types';
import { formatCurrency, formatKm } from '@/src/utils/formatters';
import { formatWeight } from '@/src/utils/formatWeight';

type FreightOfferCardProps = {
  offer: FreightOffer;
  analysis: FreightOfferAnalysis;
  onCalculate: (offer: FreightOffer) => void;
};

export function FreightOfferCard({ offer, analysis, onCalculate }: FreightOfferCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.carrierRow}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>{offer.carrierLogoText ?? offer.carrierName.slice(0, 2)}</Text>
          </View>
          <View style={styles.carrierTextBox}>
            <Text style={styles.carrierName}>{offer.carrierName}</Text>
            <View style={styles.sealsRow}>
              <Text style={styles.seal}>Frete Completo</Text>
              <Text style={styles.statusSeal}>{offer.status}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.routeBox}>
        <FontAwesome5 name="map-marker-alt" size={16} color={colors.primary} />
        <Text style={styles.routeText}>
          {offer.originCity.toUpperCase()} - {offer.originState} &gt; {offer.destinationCity.toUpperCase()} -{' '}
          {offer.destinationState}
        </Text>
      </View>

      <View style={styles.infoGrid}>
        <InfoItem label="Carga" value={offer.cargoType} icon="box" />
        <InfoItem label="Veículo" value={offer.vehicleTypes.join(' / ')} icon="truck" />
        <InfoItem label="Peso" value={formatWeight(offer.weightKg)} icon="weight-hanging" />
        <InfoItem label="Distância" value={offer.distanceKm ? formatKm(offer.distanceKm) : 'Nao informada'} icon="route" />
        <InfoItem label="Coleta" value={offer.collectionDate} icon="calendar-alt" />
        <InfoItem label="Entrega" value={offer.deliveryDate} icon="calendar-check" />
      </View>

      {offer.notes ? <Text style={styles.notes}>{offer.notes}</Text> : null}

      <View style={styles.valueBox}>
        <Text style={styles.valueLabel}>Valor do frete</Text>
        <Text style={styles.freightValue}>
          {offer.freightValue === null ? 'A combinar' : formatCurrency(offer.freightValue)}
        </Text>
        <View style={styles.valueDetails}>
          <Text style={styles.detailText}>Mínimo ANTT estimado: {formatCurrency(offer.estimatedAnttMinimumValue)}</Text>
          <Text style={styles.detailText}>
            Pedágios: {offer.tollValue === null ? 'Indisponível' : formatCurrency(offer.tollValue)}
          </Text>
          <Text style={styles.detailText}>Histórico da rota: {formatCurrency(offer.historicalAverageValue)}</Text>
        </View>
      </View>

      <View style={styles.analysisBox}>
        <View style={styles.analysisHeader}>
          <Text style={styles.analysisTitle}>Análise TruckLucro</Text>
          <FreightAnalysisBadge analysis={analysis} />
        </View>
        <Text style={styles.analysisDescription}>{analysis.description}</Text>
        <View style={styles.comparisonRow}>
          {analysis.percentageAboveAntt !== null ? (
            <Text style={styles.comparisonText}>{formatPercentage(analysis.percentageAboveAntt)} da ANTT</Text>
          ) : null}
          {analysis.percentageVsHistory !== null ? (
            <Text style={styles.comparisonText}>{formatPercentage(analysis.percentageVsHistory)} da média histórica</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.actions}>
        <ActionButton
          label="Compartilhar"
          icon="share-alt"
          variant="green"
          onPress={() => Alert.alert('Compartilhamento em breve.')}
        />
        <ActionButton
          label="Tenho Interesse"
          icon="heart"
          variant="orange"
          onPress={() =>
            Alert.alert('Interesse registrado.', 'Em breve a transportadora será notificada.')
          }
        />
        <ActionButton
          label="Calcular este frete"
          icon="calculator"
          variant="light"
          fullWidth
          onPress={() => onCalculate(offer)}
        />
      </View>
    </View>
  );
}

function InfoItem({ label, value, icon }: { label: string; value: string; icon: keyof typeof FontAwesome5.glyphMap }) {
  return (
    <View style={styles.infoItem}>
      <FontAwesome5 name={icon} size={13} color={colors.primary} />
      <View style={styles.infoTextBox}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function ActionButton({
  label,
  icon,
  variant,
  fullWidth,
  onPress,
}: {
  label: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  variant: 'green' | 'orange' | 'light';
  fullWidth?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        styles[variant],
        fullWidth && styles.fullWidthAction,
        pressed && styles.actionPressed,
      ]}>
      <FontAwesome5 name={icon} size={13} color={variant === 'light' ? colors.primary : colors.white} />
      <Text style={[styles.actionText, variant === 'light' && styles.actionTextLight]}>{label}</Text>
    </Pressable>
  );
}

function formatPercentage(value: number) {
  const absValue = Math.abs(value).toLocaleString('pt-BR', {
    maximumFractionDigits: 0,
  });

  return value >= 0 ? `${absValue}% acima` : `${absValue}% abaixo`;
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: 16,
    elevation: 3,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cardHeader: {
    gap: 10,
  },
  carrierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: colors.primary,
  },
  logoText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  carrierTextBox: {
    flex: 1,
    gap: 6,
  },
  carrierName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  sealsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  seal: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  statusSeal: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: '#E8F8EF',
    color: colors.greenDark,
    fontSize: 11,
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  routeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    borderRadius: 14,
    backgroundColor: colors.background,
    padding: 12,
  },
  routeText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoTextBox: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  infoValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  notes: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  valueBox: {
    gap: 7,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
    padding: 12,
  },
  valueLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
  },
  freightValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  valueDetails: {
    gap: 4,
  },
  detailText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  analysisBox: {
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
  },
  analysisHeader: {
    gap: 8,
  },
  analysisTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  analysisDescription: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  comparisonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  comparisonText: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  green: {
    flex: 1,
    backgroundColor: colors.green,
  },
  orange: {
    flex: 1.2,
    backgroundColor: colors.primary,
  },
  light: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  fullWidthAction: {
    width: '100%',
  },
  actionPressed: {
    opacity: 0.84,
  },
  actionText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  actionTextLight: {
    color: colors.primary,
  },
});
