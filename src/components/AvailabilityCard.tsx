import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';

type AvailabilityCardProps = {
  onPress: () => void;
};

export function AvailabilityCard({ onPress }: AvailabilityCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <FontAwesome5 name="truck" size={20} color={colors.primary} />
        <Text style={styles.title}>Minha Disponibilidade</Text>
      </View>
      <Text style={styles.text}>
        Anuncie que você está disponível. Transportadoras e agentes poderão te contatar diretamente pelo WhatsApp.
      </Text>
      <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <FontAwesome5 name="truck" size={18} color={colors.text} />
        <Text style={styles.buttonText}>Marcar como Disponível</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 18,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: 18,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  text: {
    color: colors.textMuted,
    fontSize: 17,
    lineHeight: 25,
  },
  button: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.84,
  },
  buttonText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
});
