import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '@/src/components/Button';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

export default function CodigoScreen() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function confirmCode() {
    if (/^\d{6}$/.test(code)) {
      setError('');
      router.push('/cadastro-pessoal');
      return;
    }

    setError('Digite um codigo com 6 digitos.');
  }

  return (
    <Screen>
      <Header title="Codigo de confirmacao" subtitle="Use qualquer codigo numerico com 6 digitos." />
      <Input
        label="Codigo"
        keyboardType="number-pad"
        maxLength={6}
        placeholder="000000"
        value={code}
        onChangeText={setCode}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Confirmar" onPress={confirmCode} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    fontWeight: '700',
  },
});
