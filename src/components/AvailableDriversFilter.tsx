import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '@/src/theme/colors';

type AvailableDriversFilterProps = {
  city: string;
  state: string;
  vehicleType: string;
  bodyType: string;
  onCityChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onVehicleTypeChange: (value: string) => void;
  onBodyTypeChange: (value: string) => void;
};

export function AvailableDriversFilter({
  city,
  state,
  vehicleType,
  bodyType,
  onCityChange,
  onStateChange,
  onVehicleTypeChange,
  onBodyTypeChange,
}: AvailableDriversFilterProps) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <FontAwesome5 name="filter" size={18} color={colors.text} />
        <Text style={styles.title}>Filtros</Text>
      </View>
      <Field label="Cidade" icon="map-marker-alt" placeholder="Filtrar por cidade..." value={city} onChangeText={onCityChange} />
      <Field label="Estado (UF)" placeholder="Todos os estados" value={state} onChangeText={onStateChange} />
      <Field label="Tipo de caminhão" placeholder="Todos os tipos" value={vehicleType} onChangeText={onVehicleTypeChange} />
      <Field label="Tipo de carroceria" placeholder="Todas as carrocerias" value={bodyType} onChangeText={onBodyTypeChange} />
    </View>
  );
}

function Field({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  icon?: keyof typeof FontAwesome5.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        {icon ? <FontAwesome5 name={icon} size={17} color={colors.textMuted} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
        <FontAwesome5 name="chevron-down" size={13} color={colors.textMuted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: 16,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
  },
  inputBox: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
});
