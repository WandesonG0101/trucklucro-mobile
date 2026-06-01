import { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { AvailabilityCard } from '@/src/components/AvailabilityCard';
import {
  AvailabilityModal,
  type AvailabilityFormState,
} from '@/src/components/AvailabilityModal';
import { AvailableDriverCard } from '@/src/components/AvailableDriverCard';
import { AvailableDriversFilter } from '@/src/components/AvailableDriversFilter';
import { Header } from '@/src/components/Header';
import { Screen } from '@/src/components/Screen';
import { useAvailability } from '@/src/context/AvailabilityContext';
import { availableDrivers } from '@/src/data';
import { colors } from '@/src/theme/colors';
import type { AvailableDriver } from '@/src/types';
import { getAvailabilityRemaining } from '@/src/utils/getAvailabilityRemaining';

const initialForm: AvailabilityFormState = {
  city: '',
  state: '',
  vehicleType: 'Caminhão',
  bodyType: '',
  description: '',
};

export default function ToVazioScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [cityFilter, setCityFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('');
  const [bodyTypeFilter, setBodyTypeFilter] = useState('');
  const { currentUserAvailabilities, publishAvailability } = useAvailability();

  const drivers = useMemo(
    () =>
      [...currentUserAvailabilities, ...availableDrivers].filter(
        (driver) => getAvailabilityRemaining(driver.availableUntil) !== 'Expirado',
      ),
    [currentUserAvailabilities],
  );

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      const matchesCity = !cityFilter || normalizeText(driver.city).includes(normalizeText(cityFilter));
      const matchesState = !stateFilter || normalizeText(driver.state).includes(normalizeText(stateFilter));
      const matchesVehicle =
        !vehicleTypeFilter || normalizeText(driver.vehicleType).includes(normalizeText(vehicleTypeFilter));
      const matchesBody = !bodyTypeFilter || normalizeText(driver.bodyType ?? '').includes(normalizeText(bodyTypeFilter));

      return matchesCity && matchesState && matchesVehicle && matchesBody;
    });
  }, [bodyTypeFilter, cityFilter, drivers, stateFilter, vehicleTypeFilter]);

  function updateForm(field: keyof AvailabilityFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSaveAvailability() {
    const availableUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const newDriver: AvailableDriver = {
      id: `current-user-${Date.now()}`,
      name: 'Você',
      initials: 'EU',
      city: form.city.trim(),
      state: form.state.trim().toUpperCase(),
      vehicleType: form.vehicleType.trim(),
      bodyType: form.bodyType.trim() || undefined,
      description: form.description.trim() || undefined,
      availableUntil,
      phone: '',
      isCurrentUser: true,
    };

    // TODO: salvar disponibilidade na API e/ou AsyncStorage para persistir entre sessões.
    publishAvailability(newDriver);
    setModalVisible(false);
    setForm(initialForm);
    Alert.alert('Disponibilidade publicada.', 'Ela ficará ativa por 1 dia.');
  }

  return (
    <Screen>
      <Header title="Tô Vazio" subtitle="Anuncie sua disponibilidade para transportadoras e agentes." />
      <AvailabilityCard onPress={() => setModalVisible(true)} />
      <AvailableDriversFilter
        city={cityFilter}
        state={stateFilter}
        vehicleType={vehicleTypeFilter}
        bodyType={bodyTypeFilter}
        onCityChange={setCityFilter}
        onStateChange={(value) => setStateFilter(value.toUpperCase())}
        onVehicleTypeChange={setVehicleTypeFilter}
        onBodyTypeChange={setBodyTypeFilter}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Motoristas Disponíveis</Text>
        <Text style={styles.countBadge}>{filteredDrivers.length}</Text>
      </View>

      {filteredDrivers.map((driver) => (
        <AvailableDriverCard key={driver.id} driver={driver} />
      ))}

      {filteredDrivers.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nenhum motorista encontrado</Text>
          <Text style={styles.emptyText}>Ajuste os filtros ou marque sua disponibilidade.</Text>
        </View>
      ) : null}

      <AvailabilityModal
        visible={modalVisible}
        form={form}
        onChange={updateForm}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveAvailability}
      />
    </Screen>
  );
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  countBadge: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  emptyCard: {
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 18,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
