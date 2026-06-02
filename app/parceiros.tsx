import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { partners } from '@/src/data';
import { colors } from '@/src/theme/colors';

export default function ParceirosScreen() {
  return (
    <Screen>
      <Header title="Parceiros TruckLucro" subtitle="Beneficios ficticios para reduzir custo e viajar melhor." />

      <Card style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Ionicons name="sparkles" size={24} color={colors.white} />
        </View>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Clube de vantagens</Text>
          <Text style={styles.heroText}>
            Ofertas simuladas para diesel, manutencao, pneus, seguro e apoio logistico na estrada.
          </Text>
        </View>
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{partners.length}</Text>
          <Text style={styles.statLabel}>parceiros</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>TO</Text>
          <Text style={styles.statLabel}>regiao foco</Text>
        </Card>
      </View>

      {partners.map((partner) => (
        <Card key={partner.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.logo, { backgroundColor: partner.color }]}>
              <FontAwesome5 name={partner.icon} size={22} color={colors.white} />
            </View>
            <View style={styles.partnerInfo}>
              <Text style={styles.highlight}>{partner.highlight}</Text>
              <Text style={styles.name}>{partner.name}</Text>
              <Text style={styles.category}>{partner.category}</Text>
            </View>
          </View>

          <Text style={styles.benefit}>{partner.benefit}</Text>
          <Text style={styles.description}>{partner.description}</Text>

          <View style={styles.detailsRow}>
            <View style={styles.detailPill}>
              <Ionicons name="pricetag-outline" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{partner.discount}</Text>
            </View>
            <View style={styles.detailPill}>
              <Ionicons name="location-outline" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{partner.region}</Text>
            </View>
          </View>

          <View style={styles.couponBox}>
            <View>
              <Text style={styles.couponLabel}>Cupom TruckLucro</Text>
              <Text style={styles.couponCode}>{partner.coupon}</Text>
            </View>
            <Ionicons name="copy-outline" size={22} color={colors.primary} />
          </View>

          <Button title="Ver beneficio" variant="ghost" onPress={() => undefined} />
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceMuted,
  },
  heroBadge: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
  heroContent: {
    flex: 1,
    gap: 4,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 14,
  },
  statNumber: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
  },
  card: {
    gap: 14,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  partnerInfo: {
    flex: 1,
    gap: 2,
  },
  highlight: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: colors.background,
  },
  detailText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  couponBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.surfaceMuted,
  },
  couponLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  couponCode: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  category: {
    color: colors.greenDark,
    fontSize: 13,
    fontWeight: '800',
  },
  benefit: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
});
