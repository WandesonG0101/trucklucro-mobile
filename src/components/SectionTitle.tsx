import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/src/theme/colors';

type SectionTitleProps = {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function SectionTitle({ title, icon }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      {icon ? <Ionicons name={icon} size={22} color={colors.primary} /> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
});
