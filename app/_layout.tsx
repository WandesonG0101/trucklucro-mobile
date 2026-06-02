import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AvailabilityProvider } from '@/src/context/AvailabilityContext';
import { TripsProvider } from '@/src/context/TripsContext';
import { UserProfileProvider } from '@/src/context/UserProfileContext';

export const unstable_settings = {
  anchor: '(auth)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <UserProfileProvider>
        <AvailabilityProvider>
          <TripsProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="fretes-disponiveis" options={{ headerShown: false }} />
              <Stack.Screen name="to-vazio" options={{ title: 'Tô vazio' }} />
              <Stack.Screen name="preco-diesel" options={{ headerShown: false }} />
              <Stack.Screen name="parceiros" options={{ title: 'Parceiros TruckLucro' }} />
              <Stack.Screen name="calcular-frete" options={{ title: 'Calcular frete' }} />
              <Stack.Screen name="servicos" options={{ title: 'Serviços' }} />
            </Stack>
            <StatusBar style="auto" />
          </TripsProvider>
        </AvailabilityProvider>
      </UserProfileProvider>
    </ThemeProvider>
  );
}
