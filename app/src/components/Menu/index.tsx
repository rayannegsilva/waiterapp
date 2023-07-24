import { FlatList } from 'react-native';

import { ProductContainer, Image, ProductDetails, Separator, AddToCartButton } from './styles';
import { Text } from '../Text';
import React, { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Product } from '../../types/Product';


interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={products => products._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <Image source={{ uri: `http://192.168.1.100:3001/uploads/${product.imagePath}` }} />
            <ProductDetails>
              <Text weight="700" >{product.name}</Text>
              <Text
                style={{ marginVertical: 8 }}
                size={14}
                color='#667'>{product.description}</Text>
              <Text size={14} weight='700'>{formatPrice(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
}
