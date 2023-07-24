import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Text } from '../Text';
import { Form, Header, Input, ModalBody, Overlay } from './styles';
import { Close } from '../Icons/Close';
import { Button } from '../Button';
import { useState } from 'react';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, isTable] = useState('');


  function handleSave() {
    onSave(table);
    onClose();
    isTable('');
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType='fade'
    >
      <Overlay behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <ModalBody>
          <Header>
            <Text weight='700'>
              Informe a Mesa
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Close color='#667' />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor={'#667'}
              keyboardType='number-pad'
              onChangeText={isTable}
            />

            <Button onPress={handleSave} disabled={table.length === 0}>Salvar</Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
