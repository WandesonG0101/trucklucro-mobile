import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';

import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

export default function CadastroConcluidoScreen() {
  const scale = useRef(new Animated.Value(0.75)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0.4)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 460,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(checkScale, {
          toValue: 1,
          friction: 5,
          tension: 95,
          useNativeDriver: true,
        }),
        Animated.timing(checkOpacity, {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timeout = setTimeout(() => {
      router.replace('/(tabs)');
    }, 1800);

    return () => clearTimeout(timeout);
  }, [checkOpacity, checkScale, opacity, scale]);

  return (
    <Screen contentContainerStyle={styles.content}>
      <Animated.View style={[styles.badge, { opacity, transform: [{ scale }] }]}>
        <Animated.View style={{ opacity: checkOpacity, transform: [{ scale: checkScale }] }}>
          <Ionicons name="checkmark" size={66} color={colors.white} />
        </Animated.View>
      </Animated.View>
      <Text style={styles.title}>Cadastro concluido!</Text>
      <Text style={styles.subtitle}>Bem-vindo ao TruckLucro.</Text>
      <Text style={styles.redirectText}>Indo para o inicio...</Text>
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
    height: 96,
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    backgroundColor: colors.green,
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
  redirectText: {
    color: colors.greenDark,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
});
