import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';
import type { AvailableDriver } from '@/src/types';
import { getAvailabilityRemaining } from '@/src/utils/getAvailabilityRemaining';

type AvailableDriverCardProps = {
  driver: AvailableDriver;
};

export function AvailableDriverCard({ driver }: AvailableDriverCardProps) {
  return (
    <View style={[styles.card, driver.isCurrentUser && styles.currentUserCard]}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{driver.initials}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{driver.name}</Text>
            {driver.isCurrentUser ? <Text style={styles.youBadge}>Você</Text> : null}
          </View>
          <View style={styles.metaRow}>
            <FontAwesome5 name="map-marker-alt" size={14} color={colors.textMuted} />
            <Text style={styles.meta}>{driver.city.toUpperCase()} - {driver.state}</Text>
          </View>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.detail}>Veículo: {driver.vehicleType}</Text>
        {driver.bodyType ? <Text style={styles.detail}>Carroceria: {driver.bodyType}</Text> : null}
        {driver.description ? <Text style={styles.description}>{driver.description}</Text> : null}
        <Text style={styles.remaining}>{getAvailabilityRemaining(driver.availableUntil)}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.whatsappButton, pressed && styles.pressed]}
          onPress={() => Alert.alert('Contato pelo WhatsApp em breve.')}>
          <FontAwesome5 name="whatsapp" size={18} color={colors.white} />
          <Text style={styles.whatsappText}>WhatsApp</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.detailsButton, pressed && styles.pressed]}
          onPress={() => Alert.alert(driver.name, driver.description || 'Detalhes em breve.')}>
          <Text style={styles.detailsText}>Ver detalhes</Text>
        </Pressable>
      </View>
    </View>
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
  currentUserCard: {
    borderColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    height: 58,
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    backgroundColor: colors.primary,
  },
  avatarText: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  info: {
    flex: 1,
    gap: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  youBadge: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
  },
  details: {
    gap: 5,
  },
  detail: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  remaining: {
    color: colors.greenDark,
    fontSize: 14,
    fontWeight: '900',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  whatsappButton: {
    minHeight: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    borderRadius: 13,
    backgroundColor: colors.green,
  },
  whatsappText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  detailsButton: {
    minHeight: 48,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
  },
  detailsText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.84,
  },
});
