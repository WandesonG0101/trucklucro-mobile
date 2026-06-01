import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '@/src/theme/colors';

export type AvailabilityFormState = {
  city: string;
  state: string;
  vehicleType: string;
  bodyType: string;
  description: string;
};

type AvailabilityModalProps = {
  visible: boolean;
  form: AvailabilityFormState;
  onChange: (field: keyof AvailabilityFormState, value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export function AvailabilityModal({ visible, form, onChange, onClose, onSave }: AvailabilityModalProps) {
  const canSave = Boolean(form.city.trim() && form.state.trim() && form.vehicleType.trim());

  function handlePhotoPress() {
    // TODO: integrar câmera/galeria para foto do caminhão.
    Alert.alert('Envio de foto em breve.');
  }

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <ScrollView style={styles.modal} contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
          <Pressable accessibilityRole="button" onPress={onClose} style={styles.closeButton}>
            <FontAwesome5 name="times" size={18} color={colors.textMuted} />
          </Pressable>
          <Text style={styles.title}>Tô Vazio</Text>
          <Text style={styles.subtitle}>
            Você ficará disponível por 1 dia. Após o prazo, é necessário renovar a disponibilidade.
          </Text>

          <View style={styles.notice}>
            <Text style={styles.noticeText}>
              ⏰ Você ficará disponível por <Text style={styles.bold}>1 dia</Text>. Após o prazo, deve renovar a disponibilidade.
            </Text>
          </View>

          <Field label="Cidade onde está disponível *" icon="map-marker-alt" placeholder="Selecione a cidade..." value={form.city} onChangeText={(value) => onChange('city', value)} />
          <Field label="Estado (UF) *" placeholder="Ex: TO" value={form.state} onChangeText={(value) => onChange('state', value.toUpperCase())} />
          <Field label="Tipo de veículo *" placeholder="Caminhão" value={form.vehicleType} onChangeText={(value) => onChange('vehicleType', value)} />

          <View style={styles.field}>
            <Text style={styles.label}>Foto do caminhão</Text>
            <Pressable accessibilityRole="button" onPress={handlePhotoPress} style={styles.photoButton}>
              <FontAwesome5 name="camera" size={17} color={colors.text} />
              <Text style={styles.photoText}>Tirar foto do caminhão</Text>
            </Pressable>
          </View>

          <Field label="Tipo de carroceria" placeholder="Selecione (opcional)" value={form.bodyType} onChangeText={(value) => onChange('bodyType', value)} />
          <Field
            label="Descrição (opcional)"
            placeholder="Ex: Disponível para fretes região Norte, prefiro carga seca..."
            value={form.description}
            onChangeText={(value) => onChange('description', value)}
            multiline
          />

          <Pressable
            accessibilityRole="button"
            disabled={!canSave}
            onPress={onSave}
            style={[styles.saveButton, !canSave && styles.disabledButton]}>
            <Text style={styles.saveText}>Salvar</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}

function Field({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  multiline,
}: {
  label: string;
  icon?: keyof typeof FontAwesome5.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputBox, multiline && styles.textArea]}>
        {icon ? <FontAwesome5 name={icon} size={17} color={colors.textMuted} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
          style={[styles.input, multiline && styles.textAreaInput]}
        />
        {!multiline ? <FontAwesome5 name="chevron-down" size={13} color={colors.textMuted} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(43, 33, 24, 0.62)',
    padding: 18,
  },
  modal: {
    maxHeight: '94%',
  },
  modalContent: {
    gap: 14,
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
    padding: 6,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  notice: {
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
    padding: 12,
  },
  noticeText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '900',
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  inputBox: {
    minHeight: 54,
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
  textArea: {
    minHeight: 116,
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  textAreaInput: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
  photoButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.background,
  },
  photoText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  saveButton: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.45,
  },
  saveText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  cancelButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  cancelText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
});
