import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';
import type { CommunityDieselPrice } from '@/src/types';
import { formatCurrencyShort } from '@/src/utils/formatCurrency';
import { getRelativeTime } from '@/src/utils/getRelativeTime';

type DieselPriceCardProps = {
  price: CommunityDieselPrice;
};

export function DieselPriceCard({ price }: DieselPriceCardProps) {
  function handleMapsPress() {
    if (!price.latitude || !price.longitude) {
      Alert.alert('Localização indisponível', 'Localização ainda não cadastrada para este posto.');
      return;
    }

    Alert.alert('Localização no Maps em breve.');
  }

  function handleWazePress() {
    if (!price.latitude || !price.longitude) {
      Alert.alert('Localização indisponível', 'Localização ainda não cadastrada para este posto.');
      return;
    }

    Alert.alert('Localização no Waze em breve.');
  }

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.stationBox}>
          <Text style={styles.stationName}>{price.stationName}</Text>
          <View style={styles.locationRow}>
            <FontAwesome5 name="map-marker-alt" size={15} color={colors.textMuted} />
            <Text style={styles.location}>
              {price.city.toUpperCase()} - {price.state}
            </Text>
          </View>
          <Text style={styles.relativeTime}>{getRelativeTime(price.informedAt)}</Text>
        </View>

        <View style={styles.pricePill}>
          <Text style={styles.fuelType}>{price.fuelType}:</Text>
          <Text style={styles.price}>{formatCurrencyShort(price.pricePerLiter)}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.published}>
        Publicado por {price.informedBy} - {price.publishedDate}
      </Text>

      <View style={styles.divider} />

      <View style={styles.actions}>
        <MapButton label="Maps" icon="location-arrow" onPress={handleMapsPress} />
        <MapButton label="Waze" icon="map-marker-alt" onPress={handleWazePress} />
      </View>
    </View>
  );
}

function MapButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.mapButton, pressed && styles.pressed]}>
      <FontAwesome5 name={icon} size={18} color={colors.text} />
      <Text style={styles.mapButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 16,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stationBox: {
    flex: 1,
    gap: 8,
  },
  stationName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 25,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  location: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '800',
  },
  relativeTime: {
    color: colors.textMuted,
    fontSize: 14,
  },
  pricePill: {
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#6B421F',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  fuelType: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  price: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  published: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  mapButton: {
    minHeight: 52,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.84,
  },
  mapButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
});
