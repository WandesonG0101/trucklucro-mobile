import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/src/theme/colors';

type HeaderHomeProps = {
  userName: string;
  truckModel: string;
  monthLabel: string;
  tripCount: number;
};

export function HeaderHome({ userName, truckModel, monthLabel, tripCount }: HeaderHomeProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.greeting}>Olá, {userName}!</Text>
          <Text style={styles.truck}>{truckModel}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.month}>{monthLabel}</Text>
          <Text style={styles.trips}>{tripCount} viagens</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
  container: {
    minHeight: 116,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  left: {
    flex: 1,
    gap: 6,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
  greeting: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  truck: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    opacity: 0.9,
  },
  month: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  trips: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.9,
  },
});
