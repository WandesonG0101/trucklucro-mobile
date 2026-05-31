import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="codigo" />
      <Stack.Screen name="cadastro-pessoal" />
      <Stack.Screen name="cadastro-veiculo" />
      <Stack.Screen name="cadastro-concluido" />
    </Stack>
  );
}
