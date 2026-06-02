import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Screen } from '@/src/components/Screen';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { colors } from '@/src/theme/colors';

type VehicleForm = {
  truckType: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
  capacity: string;
};

const emptyVehicleForm: VehicleForm = {
  truckType: '',
  brand: '',
  model: '',
  year: '',
  plate: '',
  capacity: '',
};

const textSizeOptions = ['Pequeno', 'Padrao', 'Grande'];

export default function PerfilScreen() {
  const { personalData, vehicleData, vehicles, updatePersonalData, updateVehicleData, addVehicle } = useUserProfile();
  const [fullName, setFullName] = useState(personalData.fullName);
  const [nickname, setNickname] = useState(personalData.nickname);
  const [phone, setPhone] = useState(personalData.phone);
  const [invitationCode, setInvitationCode] = useState(personalData.invitationCode);
  const [vehicleForm, setVehicleForm] = useState<VehicleForm>({
    truckType: vehicleData.truckType,
    brand: vehicleData.brand,
    model: vehicleData.model,
    year: vehicleData.year,
    plate: vehicleData.plate,
    capacity: vehicleData.capacity,
  });
  const [newVehicleForm, setNewVehicleForm] = useState<VehicleForm>(emptyVehicleForm);
  const [textSize, setTextSize] = useState('Padrao');

  const displayName = fullName || nickname || 'Motorista TruckLucro';
  const initials = getInitials(displayName);
  const displayPhone = phone || 'Telefone nao informado';

  function updateVehicleField(field: keyof VehicleForm, value: string) {
    setVehicleForm((current) => ({ ...current, [field]: value }));
  }

  function updateNewVehicleField(field: keyof VehicleForm, value: string) {
    setNewVehicleForm((current) => ({ ...current, [field]: value }));
  }

  function handleAddVehicle() {
    if (!newVehicleForm.truckType.trim() && !newVehicleForm.brand.trim() && !newVehicleForm.model.trim()) {
      Alert.alert('Informe o caminhao', 'Preencha pelo menos tipo, marca ou modelo para adicionar outro caminhao.');
      return;
    }

    addVehicle({
      truckType: newVehicleForm.truckType.trim(),
      brand: newVehicleForm.brand.trim(),
      model: newVehicleForm.model.trim(),
      year: newVehicleForm.year.trim(),
      plate: newVehicleForm.plate.trim(),
      capacity: newVehicleForm.capacity.trim(),
    });
    setNewVehicleForm(emptyVehicleForm);
  }

  function handleSave() {
    updatePersonalData({
      fullName: fullName.trim(),
      nickname: nickname.trim(),
      phone: phone.trim(),
      invitationCode: invitationCode.trim() || 'TRUCKLUCRO10',
    });
    updateVehicleData({
      truckType: vehicleForm.truckType.trim(),
      brand: vehicleForm.brand.trim(),
      model: vehicleForm.model.trim(),
      year: vehicleForm.year.trim(),
      plate: vehicleForm.plate.trim(),
      capacity: vehicleForm.capacity.trim(),
    });
    Alert.alert('Perfil salvo', 'Suas informacoes foram atualizadas.');
  }

  function handleLogout() {
    router.replace('/login');
  }

  return (
    <Screen>
      <Header title="Perfil" subtitle="Gerencie seus dados, caminhoes e preferencias." />

      <Card style={styles.profileCard}>
        <Pressable accessibilityRole="button" style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={16} color={colors.white} />
          </View>
        </Pressable>
        <Text style={styles.profileName}>{displayName}</Text>
        <Text style={styles.profilePhone}>{displayPhone}</Text>
        <Text style={styles.photoHint}>Toque para adicionar foto de perfil</Text>
      </Card>

      <Card style={styles.sectionCard}>
        <SectionHeader icon="person-outline" title="Dados pessoais" />
        <Input label="Nome completo" placeholder="Seu nome" value={fullName} onChangeText={setFullName} />
        <Input label="Apelido" placeholder="Como quer ser chamado?" value={nickname} onChangeText={setNickname} />
        <Input
          label="Telefone"
          placeholder="(63) 99999-9999"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <Input
          label="Codigo de convite"
          placeholder="TRUCKLUCRO10"
          autoCapitalize="characters"
          value={invitationCode}
          onChangeText={setInvitationCode}
        />
        <Text style={styles.helperText}>Use esse codigo para convidar outros motoristas para o TruckLucro.</Text>
      </Card>

      <Card style={styles.sectionCard}>
        <SectionHeader icon="bus-outline" title="Informacoes do caminhao" />
        <Input
          label="Tipo de caminhao"
          placeholder="Truck, carreta, bitrem..."
          value={vehicleForm.truckType}
          onChangeText={(value) => updateVehicleField('truckType', value)}
        />
        <Input
          label="Marca"
          placeholder="Scania, Volvo, Mercedes-Benz..."
          value={vehicleForm.brand}
          onChangeText={(value) => updateVehicleField('brand', value)}
        />
        <Input
          label="Modelo"
          placeholder="R540, FH, Atego..."
          value={vehicleForm.model}
          onChangeText={(value) => updateVehicleField('model', value)}
        />
        <View style={styles.twoColumns}>
          <Input
            label="Ano"
            placeholder="2020"
            keyboardType="number-pad"
            value={vehicleForm.year}
            onChangeText={(value) => updateVehicleField('year', value)}
            style={styles.compactInput}
          />
          <Input
            label="Placa"
            placeholder="ABC1D23"
            autoCapitalize="characters"
            value={vehicleForm.plate}
            onChangeText={(value) => updateVehicleField('plate', value)}
            style={styles.compactInput}
          />
        </View>
        <Input
          label="Capacidade de carga"
          placeholder="Ex: 14 toneladas"
          value={vehicleForm.capacity}
          onChangeText={(value) => updateVehicleField('capacity', value)}
        />
      </Card>

      <Card style={styles.sectionCard}>
        <SectionHeader icon="add-circle-outline" title="Adicionar mais caminhoes" />
        <Text style={styles.helperText}>Cadastre outros caminhoes para usar em viagens futuras.</Text>
        <Input
          label="Tipo"
          placeholder="Carreta, bitruck, toco..."
          value={newVehicleForm.truckType}
          onChangeText={(value) => updateNewVehicleField('truckType', value)}
        />
        <View style={styles.twoColumns}>
          <Input
            label="Marca"
            placeholder="Volvo"
            value={newVehicleForm.brand}
            onChangeText={(value) => updateNewVehicleField('brand', value)}
            style={styles.compactInput}
          />
          <Input
            label="Modelo"
            placeholder="FH"
            value={newVehicleForm.model}
            onChangeText={(value) => updateNewVehicleField('model', value)}
            style={styles.compactInput}
          />
        </View>
        <Button title="Adicionar caminhao" variant="ghost" onPress={handleAddVehicle} />

        {vehicles.length > 1 ? (
          <View style={styles.vehicleList}>
            {vehicles.slice(1).map((vehicle) => (
              <View key={vehicle.id} style={styles.vehicleItem}>
                <Ionicons name="bus-outline" size={20} color={colors.primary} />
                <Text style={styles.vehicleText}>{formatVehicle(vehicle)}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </Card>

      <Button title="Salvar perfil" variant="secondary" onPress={handleSave} />

      <Card style={styles.sectionCard}>
        <SectionHeader icon="text-outline" title="Tamanho do texto" />
        <View style={styles.textSizeRow}>
          {textSizeOptions.map((option) => (
            <Pressable
              key={option}
              accessibilityRole="button"
              onPress={() => setTextSize(option)}
              style={[styles.textSizeChip, textSize === option && styles.textSizeChipSelected]}>
              <Text style={[styles.textSizeText, textSize === option && styles.textSizeTextSelected]}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Pressable accessibilityRole="button" style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={colors.danger} />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </Pressable>
    </Screen>
  );
}

function SectionHeader({ icon, title }: { icon: keyof typeof Ionicons.glyphMap; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function formatVehicle(vehicle: VehicleForm) {
  return [vehicle.truckType, vehicle.brand, vehicle.model].filter(Boolean).join(' ') || 'Caminhao sem nome';
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
    gap: 8,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceMuted,
  },
  avatar: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    backgroundColor: colors.primary,
  },
  avatarText: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.surfaceMuted,
    borderRadius: 16,
    backgroundColor: colors.green,
  },
  profileName: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
  },
  profilePhone: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '800',
  },
  photoHint: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
  },
  sectionCard: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 10,
  },
  compactInput: {
    minWidth: 0,
  },
  vehicleList: {
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    backgroundColor: colors.background,
    padding: 10,
  },
  vehicleText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  textSizeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  textSizeChip: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingVertical: 10,
  },
  textSizeChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  textSizeText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '900',
  },
  textSizeTextSelected: {
    color: colors.white,
  },
  logoutButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  logoutText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '900',
  },
});
