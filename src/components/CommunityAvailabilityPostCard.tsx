import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';
import type { AvailableDriver } from '@/src/types';
import { getAvailabilityRemaining } from '@/src/utils/getAvailabilityRemaining';

type CommunityAvailabilityPostCardProps = {
  driver: AvailableDriver;
};

export function CommunityAvailabilityPostCard({ driver }: CommunityAvailabilityPostCardProps) {
  return (
    <View style={[styles.card, driver.isCurrentUser && styles.currentUserCard]}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{driver.initials}</Text>
        </View>
        <View style={styles.headerText}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{driver.name}</Text>
            {driver.isCurrentUser ? <Text style={styles.youBadge}>Você</Text> : null}
          </View>
          <Text style={styles.time}>{getAvailabilityRemaining(driver.availableUntil)}</Text>
        </View>
      </View>

      <View style={styles.postBody}>
        <Text style={styles.postText}>🚚 {driver.vehicleType} disponível em {driver.city} - {driver.state}</Text>
        {driver.bodyType ? <Text style={styles.postText}>📦 Carroceria: {driver.bodyType}</Text> : null}
        {driver.description ? <Text style={styles.description}>{driver.description}</Text> : null}
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.actionButton, styles.whatsappButton, pressed && styles.pressed]}
          onPress={() => Alert.alert('Contato pelo WhatsApp em breve.')}>
          <FontAwesome5 name="whatsapp" size={18} color={colors.white} />
          <Text style={styles.whatsappText}>WhatsApp</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.actionButton, styles.detailsButton, pressed && styles.pressed]}
          onPress={() => Alert.alert(driver.name, driver.description || 'Detalhes em breve.')}>
          <Text style={styles.detailsText}>Ver detalhes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
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
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: colors.primary,
  },
  avatarText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  headerText: {
    flex: 1,
    gap: 5,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  time: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
  },
  postBody: {
    gap: 8,
    paddingLeft: 70,
  },
  postText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
  },
  description: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    paddingLeft: 70,
  },
  actionButton: {
    minHeight: 46,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },
  whatsappButton: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.green,
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  whatsappText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  detailsText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.84,
  },
});
