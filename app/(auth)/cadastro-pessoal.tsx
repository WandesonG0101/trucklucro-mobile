import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { colors } from '@/src/theme/colors';

export default function CadastroPessoalScreen() {
  const [accepted, setAccepted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const { updatePersonalData } = useUserProfile();

  function handleContinue() {
    updatePersonalData({
      fullName: fullName.trim(),
      nickname: nickname.trim(),
      invitationCode: invitationCode.trim() || 'TRUCKLUCRO10',
    });
    router.push('/cadastro-veiculo');
  }

  return (
    <Screen>
      <Header title="Dados pessoais" subtitle="Conte o basico para personalizar sua experiencia." />
      <Input
        label="Nome completo"
        placeholder="Seu nome"
        autoCapitalize="words"
        value={fullName}
        onChangeText={setFullName}
      />
      <Input
        label="Apelido opcional"
        placeholder="Como quer ser chamado?"
        autoCapitalize="words"
        value={nickname}
        onChangeText={setNickname}
      />
      <Input label="CPF" placeholder="000.000.000-00" keyboardType="number-pad" />
      <Input label="Como conheceu o TruckLucro?" placeholder="Indique o canal ou amigo" />
      <Input
        label="Codigo de convite opcional"
        placeholder="Ex: TRUCK10"
        autoCapitalize="characters"
        value={invitationCode}
        onChangeText={setInvitationCode}
      />

      <Pressable style={styles.checkboxRow} onPress={() => setAccepted((current) => !current)}>
        <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
          {accepted ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
        <Text style={styles.terms}>Aceito os termos de uso e politica de privacidade.</Text>
      </Pressable>

      <Button
        title="Continuar"
        disabled={!accepted}
        onPress={handleContinue}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.green,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  checkboxChecked: {
    backgroundColor: colors.green,
  },
  checkmark: {
    color: colors.white,
    fontWeight: '900',
  },
  terms: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
  },
});
