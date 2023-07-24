import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Actions, Image, Item, ProductContainer, ProductDetail, QuantityContainer, Summary, TotalContainer } from './styles';
import { Text } from '../Text';
import { formatPrice } from '../../utils/formatPrice';
import React, { useState } from 'react';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import { Product } from '../../types/Product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import api from '../../service/api';


interface CartProps {
  cartItems: CartItem[]
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmedOrder: () => void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmedOrder, selectedTable }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmedOrder() {



    setIsLoading(true);
    await api.post('/orders', {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    });

    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmedOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {cartItems.length > 0 && (
        <FlatList
          style={{ marginBottom: 20, maxHeight: 150 }}
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{ uri: `http://192.168.1.100:3001/uploads/${cartItem.product.imagePath}` }}
                />
                <QuantityContainer>
                  <Text size={14} color='#667'>{cartItem.quantity}</Text>
                </QuantityContainer>

                <ProductDetail>
                  <Text size={14} weight='700'>{cartItem.product.name}</Text>
                  <Text color='#667' size={14} style={{ marginTop: 8 }}>{formatPrice(cartItem.product.price)}</Text>
                </ProductDetail>
              </ProductContainer>

              <Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onDecrement(cartItem.product)}
                  style={{ marginLeft: 24 }}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#667'>Total</Text>
              <Text weight='700' size={20}>
                {formatPrice(total)}
              </Text>
            </>
          ) : (
            <Text color='#999'>
              Seu carrinho está vazio
            </Text>
          )
          }
        </TotalContainer>
        <Button
          onPress={handleConfirmedOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
