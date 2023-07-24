import { FlatList, Modal } from 'react-native';
import { Text } from '../Text';
import { Product } from '../../types/Product';
import { CloseButton, Footer, FooterContainer, Header, Image, Ingredient, IngredientsContainer, ModalBody, Price } from './styles';
import { Close } from '../Icons/Close';
import React from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../Button';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{ uri: `http://192.168.1.100:3001/uploads/${product.imagePath}` }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight='700'>{product.name}</Text>
          <Text color='#667' style={{ marginTop: 8 }}>{product.description}</Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text>Ingredientes</Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color='#667' style={{ marginLeft: 20 }}>{ingredient.name}</Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <Price>
            <Text color='#667'>Preço</Text>
            <Text size={20} weight='700'>{formatPrice(product.price)}</Text>
          </Price>

          <Button onPress={handleAddToCart}>Adicionar ao Pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
