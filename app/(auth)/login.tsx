import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');

  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.brandBox}>
        <Text style={styles.brand}>TruckLucro</Text>
        <Text style={styles.slogan}>Dirija sabendo quanto realmente ganha.</Text>
      </View>

      <Header title="Entre com seu telefone" subtitle="Vamos enviar um codigo de confirmacao." />
      <Input
        label="Telefone"
        keyboardType="phone-pad"
        placeholder="(11) 99999-9999"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Enviar codigo" onPress={() => router.push('/codigo')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  brandBox: {
    gap: 8,
    borderRadius: 18,
    backgroundColor: colors.primary,
    padding: 22,
  },
  brand: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '900',
  },
  slogan: {
    color: colors.surfaceMuted,
    fontSize: 17,
    lineHeight: 24,
  },
});
