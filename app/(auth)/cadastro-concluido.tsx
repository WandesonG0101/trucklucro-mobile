import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

export default function CadastroConcluidoScreen() {
  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>OK</Text>
      </View>
      <Text style={styles.title}>Cadastro concluído!</Text>
      <Text style={styles.subtitle}>Bem-vindo ao TruckLucro.</Text>
      <Button title="Ir para o início" onPress={() => router.replace('/(tabs)')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    height: 88,
    width: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 44,
    backgroundColor: colors.green,
  },
  badgeText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
  },
  title: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 18,
    textAlign: 'center',
  },
});
