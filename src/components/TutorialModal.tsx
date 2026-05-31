import { Modal, Pressable, StyleSheet, Text } from 'react-native';

import { Button } from '@/src/components/Button';
import { colors } from '@/src/theme/colors';

type TutorialModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export function TutorialModal({ visible, title, message, onClose }: TutorialModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Button title="Entendi" onPress={onClose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 45, 77, 0.45)',
    padding: 24,
  },
  modal: {
    gap: 14,
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  message: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
});
