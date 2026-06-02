import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/src/theme/colors';

const homeHeroImage = require('../../assets/images/trucklucro-hero.png');

type HeaderHomeProps = {
  userName: string;
  truckModel: string;
  monthLabel: string;
  tripCount: number;
};

export function HeaderHome({ userName, truckModel, monthLabel, tripCount }: HeaderHomeProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ImageBackground
        source={homeHeroImage}
        style={styles.heroImage}
        imageStyle={styles.heroImageRadius}
        resizeMode="cover">
        <View style={styles.heroOverlay} />

        <View style={styles.topRow}>
          <Text style={styles.driverName} numberOfLines={1}>
            {userName}
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.left}>
            <Text style={styles.truck} numberOfLines={1}>
              {truckModel}
            </Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.month}>{monthLabel}</Text>
            <Text style={styles.trips}>{tripCount} viagens</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
  heroImage: {
    height: 128,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 0,
    backgroundColor: colors.primaryLight,
  },
  heroImageRadius: {
    borderRadius: 0,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(43, 33, 24, 0.46)',
  },
  topRow: {
    position: 'absolute',
    top: 12,
    left: 20,
    right: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  left: {
    flex: 1,
    gap: 6,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
  driverName: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 27,
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
