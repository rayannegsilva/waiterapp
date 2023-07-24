import React from 'react';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';
import { TouchableOpacity } from 'react-native';

interface HeaderProps {
  selectedTable: string;
  onCancel: () => void;
}

export function Header({ selectedTable, onCancel }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
          <Text size={24} weight='700'>
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <Content>
          <OrderHeader>
            <Text size={24} weight="700">Pedido</Text>
            <TouchableOpacity onPress={onCancel}>
              <Text color='#D73035' weight='700' size={14}>cancelar pedido</Text>
            </TouchableOpacity>
          </OrderHeader>

          <Table>
            <Text color="#667">Mesa {selectedTable}</Text>
          </Table>
        </Content>
      )}
    </Container>
  );
}
