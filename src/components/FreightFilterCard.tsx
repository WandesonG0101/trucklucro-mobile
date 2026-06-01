import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '@/src/theme/colors';
import type { FreightAnalysisStatus } from '@/src/types';

export type FreightStatusFilter = FreightAnalysisStatus | 'todos';

type FreightFilterCardProps = {
  searchText: string;
  selectedStatus: FreightStatusFilter;
  onSearchTextChange: (value: string) => void;
  onStatusChange: (value: FreightStatusFilter) => void;
};

const filters: { label: string; value: FreightStatusFilter }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Atrativos', value: 'bom' },
  { label: 'Dentro da ANTT', value: 'regular' },
  { label: 'Atenção', value: 'baixo' },
  { label: 'A combinar', value: 'a_combinar' },
];

export function FreightFilterCard({
  searchText,
  selectedStatus,
  onSearchTextChange,
  onStatusChange,
}: FreightFilterCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome5 name="filter" size={15} color={colors.primary} />
        <Text style={styles.title}>Filtrar ofertas</Text>
      </View>

      <TextInput
        value={searchText}
        onChangeText={onSearchTextChange}
        placeholder="Buscar por origem ou destino"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <View style={styles.chips}>
        {filters.map((filter) => {
          const selected = selectedStatus === filter.value;

          return (
            <Pressable
              key={filter.value}
              accessibilityRole="button"
              onPress={() => onStatusChange(filter.value)}
              style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{filter.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 14,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    color: colors.text,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  chipTextSelected: {
    color: colors.white,
  },
});
