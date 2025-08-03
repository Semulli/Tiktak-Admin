import { useEffect, useState } from "react";
import Table from "../../components/custom/Table";
import { useSearchStore } from "../../store/SearchStore";
import { Layout } from "../../layout";
import type { Order, OrderStatus } from "../../interface";
import { getOrders, updateOrderStatus } from "../../services/fetchData"; // update servisini də əlavə et
import OrderModal from "../../components/custom/Modal/orderDetailModal"; // əlavə etdiyimiz modal
import { EyeOutlined } from "@ant-design/icons";
function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { text: searchText } = useSearchStore();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Sifarişlər yüklənmədi:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const filteredOrders = orders.filter((order) => {
    const query = searchText.toLowerCase();
    return order.orderNumber.toLowerCase().includes(query);
  });

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!selectedOrder) return;
    try {
      await updateOrderStatus(selectedOrder.id, newStatus);
      fetchOrders();
    } catch (err) {
      console.error("Status yenilənmədi", err);
    }
  };

  return (
    <Layout>
      <Table
        title="Sifarişlər"
        data={filteredOrders}
        isLoading={loading}
        columns={[
          { key: "id", label: "ID" },
          { key: "orderNumber", label: "Sifariş Nömrəsi" },
          { key: "total", label: "Cəm Məbləğ" },
          { key: "paymentAndDelivery", label: "Ödəmə / Çatdırılma" },
          { key: "status", label: "Status" },
        ]}
        actions={(row) => (
          <button
            className="text-green-500 "
            onClick={() => handleOpenModal(row)}
          >
            <EyeOutlined /> Detallar
          </button>
        )}
      />

      {selectedOrder && (
        <OrderModal
          open={isModalOpen}
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </Layout>
  );
}

export default Orders;
