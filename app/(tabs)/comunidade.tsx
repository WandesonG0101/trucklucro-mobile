import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { CommunityAvailabilityPostCard } from '@/src/components/CommunityAvailabilityPostCard';
import { Screen } from '@/src/components/Screen';
import { useAvailability } from '@/src/context/AvailabilityContext';
import { availableDrivers } from '@/src/data';
import { colors } from '@/src/theme/colors';
import { getAvailabilityRemaining } from '@/src/utils/getAvailabilityRemaining';

export default function ComunidadeScreen() {
  const [searchText, setSearchText] = useState('');
  const { currentUserAvailabilities } = useAvailability();

  const posts = useMemo(() => {
    const basePosts = [...currentUserAvailabilities, ...availableDrivers].filter(
      (driver) => getAvailabilityRemaining(driver.availableUntil) !== 'Expirado',
    );
    const search = normalizeText(searchText);

    return basePosts.filter((driver) => {
      if (!search) {
        return true;
      }

      return normalizeText(`${driver.name} ${driver.city} ${driver.state} ${driver.vehicleType} ${driver.bodyType ?? ''}`)
        .includes(search);
    });
  }, [currentUserAvailabilities, searchText]);

  return (
    <Screen contentContainerStyle={styles.screenContent}>
      <View style={styles.hero}>
        <Text style={styles.title}>Comunidade TruckLucro</Text>
        <Text style={styles.subtitle}>Conectando caminhoneiros do Brasil</Text>
      </View>

      <View style={styles.shareBox}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>EU</Text>
        </View>
        <View style={styles.shareInput}>
          <Text style={styles.sharePlaceholder}>O que você quer compartilhar?</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <Pressable accessibilityRole="button" style={styles.bellButton}>
          <FontAwesome5 name="bell" size={18} color={colors.text} />
        </Pressable>
        <View style={styles.searchBox}>
          <FontAwesome5 name="search" size={18} color={colors.textMuted} />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar caminhoneiros..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>
      </View>

      <Pressable accessibilityRole="button" style={styles.filterButton}>
        <FontAwesome5 name="filter" size={18} color={colors.text} />
        <Text style={styles.filterText}>Mostrar apenas disponíveis</Text>
      </Pressable>

      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Disponibilidades recentes</Text>
        <Text style={styles.countBadge}>{posts.length}</Text>
      </View>

      {posts.map((driver) => (
        <CommunityAvailabilityPostCard key={driver.id} driver={driver} />
      ))}

      {posts.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nenhum motorista encontrado</Text>
          <Text style={styles.emptyText}>Marque sua disponibilidade em Tô Vazio ou ajuste a busca.</Text>
        </View>
      ) : null}
    </Screen>
  );
}

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: 0,
  },
  hero: {
    gap: 4,
    marginHorizontal: -20,
    marginTop: -20,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 22,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.text,
    fontSize: 15,
    opacity: 0.8,
  },
  shareBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 16,
  },
  avatar: {
    height: 58,
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    backgroundColor: colors.primary,
  },
  avatarText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  shareInput: {
    minHeight: 54,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  sharePlaceholder: {
    color: colors.textMuted,
    fontSize: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellButton: {
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  searchBox: {
    minHeight: 54,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  filterButton: {
    minHeight: 52,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
  },
  filterText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedTitle: {
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
    fontSize: 13,
    fontWeight: '900',
    paddingHorizontal: 12,
    paddingVertical: 5,
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
