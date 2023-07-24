import { Actions, ModalBody, OrderDetails, Overlay } from "./styles";
import CloseIcon from '../../assets/images/close-icon.svg'
import { Order } from "../../types/Order";
import { formatPrice } from "../../utils/formatPrice";
import { useEffect } from "react";

interface OderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancel: () => Promise<void>;
  onChangeOrderStatus: () => Promise<void>;
  isLoading: boolean;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancel,
  isLoading,
  onChangeOrderStatus }: OderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose]);

  if (!visible || !order) {
    return null
  }

  // let total = 0;
  // order.products.forEach(({ product, quantity }) => {
  //   total += product.price * quantity
  // })

  const total = order.products.reduce((total, { product, quantity }) => {
    return total += (product.price * quantity)
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={CloseIcon} alt="ícone de fechar o modal" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'DONE' && '✅'}
              {order.status === 'WAITING' && '⏱'}
              {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
            </span>
            <strong>
              {order.status === 'DONE' && 'Pronto'}
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em produção'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Items</strong>
          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt="imagem da comida"
                  width="56"
                  height="28.51"
                />
                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatPrice(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>R$ {formatPrice(total)}</strong>
          </div>

        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <button
              type="button"
              className="primary"
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === 'WAITING' && '👩‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Produção'}
              </strong>
            </button>
          )}

          <button
            type="button"
            className="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  )
}
