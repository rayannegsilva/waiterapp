import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';

import { Product } from '../types/Product';
import { ActivityIndicator } from 'react-native';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';
import api from '../service/api';
export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setLoading(false);
    });

    // api.get('/categories').then((response) => {
    //   setCategories(response.data);
    //   setLoading(false);
    // });

    // api.get('/products').then((response) => {
    //   setProducts(response.data);
    //   setLoading(false);
    // });
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId ? '/products' : `/categories/${categoryId}/products`;
    setIsLoadingProducts(true);

    //delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleResetOrder() {
    setCartItems([]);
    setSelectedTable('');
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItems => cartItems.product._id === product._id);
      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };
      return newCartItems;
    });
  }

  function handleDecrementCarItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItems => cartItems.product._id === product._id);

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        const newCartItems = [...prevState];

        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancel={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color={'#D73035'} size={'large'} />
          </CenteredContainer>
        )}


        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color={'#D73035'} size={'large'} />
              </CenteredContainer>
            ) : (
              <>
                {
                  products.length > 0 ? (
                    <MenuContainer>
                      <Menu
                        products={products}
                        onAddToCart={handleAddToCart}
                      />
                    </MenuContainer>
                  ) : (
                    <CenteredContainer>
                      <Empty />
                      <Text color='#667' style={{ marginTop: 24 }}>Nenhum produto encontrado!</Text>
                    </CenteredContainer>
                  )
                }
              </>
            )}
          </>
        )}
      </Container>
      <Footer>
        {/* <FooterContainer > */}
        {!selectedTable && (
          <Button
            onPress={() => setIsTableModalVisible(true)}
            disabled={isLoading}
          >
            Novo Pedido
          </Button>
        )}

        {selectedTable && (
          <Cart
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCarItem}
            onConfirmedOrder={handleResetOrder}
            selectedTable={selectedTable}
          />
        )}
        {/* </FooterContainer> */}
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
