import { router } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/src/components/Button';
import { Input } from '@/src/components/Input';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { colors } from '@/src/theme/colors';

const heroImage = require('@/assets/images/trucklucro-hero.png');

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const { updatePersonalData } = useUserProfile();

  function handleSendCode() {
    updatePersonalData({ phone: phone.trim() });
    router.push('/codigo');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <ImageBackground source={heroImage} style={styles.hero} resizeMode="cover">
          <View style={styles.heroOverlay} />

          <View style={styles.topBar}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>TL</Text>
            </View>
            <Text style={styles.logoName}>TruckLucro</Text>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.badge}>GESTAO PARA CAMINHONEIROS</Text>
            <Text style={styles.title}>TruckLucro</Text>
            <Text style={styles.subtitle}>Dirija sabendo quanto realmente ganha.</Text>
          </View>
        </ImageBackground>

        <View style={styles.formPanel}>
          <Text style={styles.formTitle}>Acesse sua conta</Text>
          <Text style={styles.formSubtitle}>Informe seu telefone para receber o codigo de confirmacao.</Text>

          <View style={styles.formContainer}>
            <Input
              label="Telefone"
              keyboardType="phone-pad"
              placeholder="(11) 99999-9999"
              value={phone}
              onChangeText={setPhone}
            />
            <Button title="Enviar codigo" variant="secondary" onPress={handleSendCode} />
            <Text style={styles.helperText}>
              Entraremos com seu numero apenas para confirmar seu acesso.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  hero: {
    minHeight: 440,
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 24, 28, 0.58)',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoMark: {
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  logoText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  logoName: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  heroContent: {
    gap: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 999,
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  title: {
    color: colors.white,
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 54,
  },
  subtitle: {
    maxWidth: 320,
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  formPanel: {
    flex: 1,
    gap: 16,
    marginTop: -18,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 28,
  },
  formTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  formSubtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  formContainer: {
    gap: 14,
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
});
