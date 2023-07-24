import { useState } from "react";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { Board, OrdersContainer } from "./styles";
import api from "../../service/api";
import { toast } from "react-toastify";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChangeOrderStatus() {
    setIsLoading(true);
    const status = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, {
      status
    });

    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`);
    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);

  }

  async function handleCancelOrder() {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 3000));
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`)
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  function handleModalOpen(order: Order) {
    setIsModalVisible(true)
    setSelectedOrder(order);
  }

  function handleModalClose() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        onClose={handleModalClose}
        order={selectedOrder}
        onCancel={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 &&
        <OrdersContainer>
          {orders.map((order) => (
            <button key={order._id} type="button" onClick={() => handleModalOpen(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} items</span>
            </button>
          ))}
        </OrdersContainer>}
    </Board>
  )
}
