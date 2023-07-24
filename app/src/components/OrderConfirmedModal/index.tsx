import { Modal, StatusBar } from 'react-native';
import { Container, OkButton } from './styles';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import React from 'react';

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;

}

export function OrderConfirmedModal({ visible, onOk }: OrderConfirmedModalProps) {
  return (
    <Modal
      visible={visible}
      animationType='fade'
    // presentationStyle='pageSheet'
    >
      <StatusBar barStyle='light-content' />
      <Container>
        <CheckCircle />
        <Text size={20} weight='700' color='#fff' style={{ marginTop: 12 }}>Pedido Confirmado</Text>
        <Text color="#fff" style={{ marginTop: 4 }}>Seu pedido já entrou na fila de produção!</Text>

        <OkButton onPress={onOk}>
          <Text weight='700' color='#d73035'>Ok</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
