import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useMemo, useState } from 'react';
import { Alert, Linking, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { serviceCategories, type ServiceCategory } from '@/src/data/serviceCategories';
import { colors } from '@/src/theme/colors';

type SuggestedService = {
  id: string;
  name: string;
  category: string;
  city: string;
  notes: string;
};

export default function ServicosScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('todos');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSuggestionModalVisible, setIsSuggestionModalVisible] = useState(false);
  const [suggestedServices, setSuggestedServices] = useState<SuggestedService[]>([]);
  const [suggestionForm, setSuggestionForm] = useState({
    name: '',
    category: '',
    city: '',
    notes: '',
  });

  const filteredServices = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return serviceCategories.filter((service) => {
      const matchesCategory = selectedCategoryId === 'todos' || service.id === selectedCategoryId;
      const matchesSearch =
        !normalizedSearch ||
        normalizeText(service.label).includes(normalizedSearch) ||
        normalizeText(service.description).includes(normalizedSearch) ||
        normalizeText(service.googleQuery).includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategoryId]);

  async function requestLocation() {
    setIsLocating(true);

    try {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert(
          'Localizacao nao autorizada',
          'Autorize a localizacao para buscar servicos perto de voce.',
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(currentLocation);
    } catch {
      Alert.alert('Nao foi possivel localizar', 'Tente novamente ou abra a busca direto no Google Maps.');
    } finally {
      setIsLocating(false);
    }
  }

  async function openGoogleSuggestions(service: ServiceCategory) {
    const query = buildGoogleMapsQuery(service.googleQuery, location);
    const canOpen = await Linking.canOpenURL(query);

    if (!canOpen) {
      Alert.alert('Google Maps indisponivel', 'Nao foi possivel abrir as sugestoes agora.');
      return;
    }

    Linking.openURL(query);
  }

  function saveSuggestion() {
    if (!suggestionForm.name.trim()) {
      Alert.alert('Informe o local', 'Digite o nome do servico ou local que voce quer sugerir.');
      return;
    }

    setSuggestedServices((current) => [
      {
        id: String(Date.now()),
        name: suggestionForm.name.trim(),
        category: suggestionForm.category.trim() || 'Servico para caminhao',
        city: suggestionForm.city.trim() || 'Cidade nao informada',
        notes: suggestionForm.notes.trim(),
      },
      ...current,
    ]);
    setSuggestionForm({ name: '', category: '', city: '', notes: '' });
    setIsSuggestionModalVisible(false);
  }

  return (
    <Screen>
      <Header title="Servicos" subtitle="Encontre apoio para o caminhao perto de voce." />

      <Card style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <FontAwesome5 name="tools" size={24} color={colors.white} />
        </View>
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>Servicos na estrada</Text>
          <Text style={styles.heroDescription}>
            Use sua localizacao para buscar oficinas, borracharias, postos e outros apoios sugeridos pelo Google.
          </Text>
        </View>
      </Card>

      <Button
        title={isLocating ? 'Localizando...' : location ? 'Atualizar localizacao' : 'Usar minha localizacao'}
        onPress={requestLocation}
        disabled={isLocating}
        variant="secondary"
      />

      {location ? (
        <Text style={styles.locationText}>
          Buscando perto de voce: {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
        </Text>
      ) : (
        <Text style={styles.locationText}>Sem localizacao: as buscas abrem no Google Maps como perto de mim.</Text>
      )}

      <Card style={styles.filterCard}>
        <Text style={styles.sectionTitle}>Filtrar servicos</Text>
        <Input
          label="Buscar"
          placeholder="Oficina, borracharia, diesel..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.chips}>
          <FilterChip
            label="Todos"
            selected={selectedCategoryId === 'todos'}
            onPress={() => setSelectedCategoryId('todos')}
          />
          {serviceCategories.map((service) => (
            <FilterChip
              key={service.id}
              label={service.label}
              selected={selectedCategoryId === service.id}
              onPress={() => setSelectedCategoryId(service.id)}
            />
          ))}
        </View>
      </Card>

      <Button title="Sugerir servico ou local" onPress={() => setIsSuggestionModalVisible(true)} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sugestoes pelo Google</Text>
        <Text style={styles.counter}>{filteredServices.length}</Text>
      </View>

      {filteredServices.map((service) => (
        <Card key={service.id} style={styles.serviceCard}>
          <View style={styles.serviceHeader}>
            <View style={styles.serviceIcon}>
              <FontAwesome5 name={service.icon} size={22} color={colors.text} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.service}>{service.label}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
          </View>
          <Button title="Buscar no Google Maps" onPress={() => openGoogleSuggestions(service)} variant="ghost" />
        </Card>
      ))}

      {suggestedServices.length ? (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sugestoes da comunidade</Text>
          <Text style={styles.counter}>{suggestedServices.length}</Text>
        </View>
      ) : null}

      {suggestedServices.map((service) => (
        <Card key={service.id} style={styles.communityCard}>
          <Text style={styles.service}>{service.name}</Text>
          <Text style={styles.serviceDescription}>{service.category}</Text>
          <Text style={styles.communityMeta}>{service.city}</Text>
          {service.notes ? <Text style={styles.communityNotes}>{service.notes}</Text> : null}
        </Card>
      ))}

      <Modal
        transparent
        animationType="fade"
        visible={isSuggestionModalVisible}
        onRequestClose={() => setIsSuggestionModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sugerir servico</Text>
              <Pressable
                accessibilityRole="button"
                style={styles.closeButton}
                onPress={() => setIsSuggestionModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>
            <Input
              label="Nome do local"
              placeholder="Ex: Oficina BR 153"
              value={suggestionForm.name}
              onChangeText={(value) => setSuggestionForm((current) => ({ ...current, name: value }))}
            />
            <Input
              label="Tipo de servico"
              placeholder="Ex: Borracharia, oficina, eletrica..."
              value={suggestionForm.category}
              onChangeText={(value) => setSuggestionForm((current) => ({ ...current, category: value }))}
            />
            <Input
              label="Cidade"
              placeholder="Cidade - UF"
              value={suggestionForm.city}
              onChangeText={(value) => setSuggestionForm((current) => ({ ...current, city: value }))}
            />
            <View style={styles.notesField}>
              <Text style={styles.notesLabel}>Observacao opcional</Text>
              <TextInput
                multiline
                textAlignVertical="top"
                placeholder="Conte por que esse local ajuda outros motoristas..."
                placeholderTextColor={colors.textMuted}
                value={suggestionForm.notes}
                onChangeText={(value) => setSuggestionForm((current) => ({ ...current, notes: value }))}
                style={styles.notesInput}
              />
            </View>
            <Button title="Salvar sugestao" onPress={saveSuggestion} />
            <Button title="Cancelar" onPress={() => setIsSuggestionModalVisible(false)} variant="ghost" />
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

function FilterChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function buildGoogleMapsQuery(query: string, location: Location.LocationObject | null) {
  const locationText = location
    ? `${location.coords.latitude},${location.coords.longitude}`
    : 'perto de mim';

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} ${locationText}`)}`;
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

const styles = StyleSheet.create({
  heroCard: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    borderColor: colors.primary,
    backgroundColor: colors.surfaceMuted,
  },
  heroIcon: {
    width: 54,
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  heroText: {
    flex: 1,
    gap: 4,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  heroDescription: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  locationText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  filterCard: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  counter: {
    minWidth: 36,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '900',
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
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '900',
  },
  chipTextSelected: {
    color: colors.white,
  },
  serviceCard: {
    gap: 14,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  serviceInfo: {
    flex: 1,
    gap: 3,
  },
  service: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  serviceDescription: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  communityCard: {
    gap: 5,
    borderColor: colors.primarySoft,
  },
  communityMeta: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  communityNotes: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(43, 33, 24, 0.62)',
  },
  modalContent: {
    gap: 14,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  closeButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
  },
  notesField: {
    gap: 8,
  },
  notesLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  notesInput: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 16,
  },
});
