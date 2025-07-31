import { Modal, Typography, Row, Col, Divider, Image, Select } from "antd";
import { useState } from "react";
import { OrderStatus, type Order } from "../../../../interface";

interface Props {
  open: boolean;
  onClose: () => void;
  order: Order;
  onStatusChange: (status: OrderStatus) => Promise<void>;
}

const statusOptions: OrderStatus[] = [
  OrderStatus.Pending,
  OrderStatus.Confirmed,
  OrderStatus.Preparing,
  OrderStatus.Delivered,
  OrderStatus.Cancelled,
];

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Gözləmədə",
  READY: "hazirdir",
  CONFIRMED: "Təsdiqləndi",
  PREPARING: "Hazırlanır",
  DELIVERED: "Çatdırıldı",
  CANCELLED: "Ləğv edildi",
};
const paymentMethodLabels: Record<string, string> = {
  CARD: "Kartla",
  CASH: "Nağd",
};
export default function OrderModal({
  open,
  onClose,
  order,
  onStatusChange,
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order.status
  );
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (val: OrderStatus) => {
    if (val === order.status) return;
    setSelectedStatus(val);
    setLoading(true);
    try {
      await onStatusChange(val);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Sifariş Detalları"
      centered
      width={800}
      bodyStyle={{
        maxHeight: "70vh",
        overflowY: "auto",
        paddingRight: 16,
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Text strong>Sifariş nömrəsi:</Typography.Text>
          <div>#{order.orderNumber}</div>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Sifariş vaxtı:</Typography.Text>
          <div>{new Date(order.createdAt).toLocaleString("az-AZ")}</div>
        </Col>

        <Col span={24}>
          <Typography.Text strong>Çatdırılma ünvanı:</Typography.Text>
          <div>{order.address}</div>
        </Col>

        <Col span={12}>
          <Typography.Text strong>Telefon:</Typography.Text>
          <div>{order.phone}</div>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Ödəmə növü:</Typography.Text>
          <div>
            {paymentMethodLabels[order.paymentMethod] || order.paymentMethod}
          </div>
        </Col>

        {order.note && (
          <Col span={24}>
            <Typography.Text strong>Qeyd:</Typography.Text>
            <div>{order.note}</div>
          </Col>
        )}
      </Row>

      <Divider />
      <Row gutter={16} align="middle">
        <Col flex="auto">
          <Typography.Text strong>Statusu dəyiş:</Typography.Text>
          <Select
            style={{ width: "100%", marginTop: 8 }}
            value={selectedStatus}
            onChange={handleStatusChange}
            disabled={loading}
            loading={loading}
          >
            {statusOptions.map((status) => (
              <Select.Option key={status} value={status}>
                {statusLabels[status]}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Divider>Məhsullar</Divider>

      {order.items.map((item) => (
        <Row
          key={item.id}
          align="middle"
          gutter={16}
          style={{ marginBottom: 12 }}
        >
          <Col>
            <Image
              src={item.product.img_url || "/placeholder.png"}
              width={50}
              height={50}
              alt={item.product.title}
              preview={false}
            />
          </Col>
          <Col flex="auto">
            <Typography.Text>{item.product.title}</Typography.Text>
          </Col>
          <Col>
            <Typography.Text>{item.quantity}</Typography.Text>
          </Col>
          <Col>
            <Typography.Text>
              {item.total_price} ₼{order.deliveryFee === "0.00" && " / pulsuz"}
            </Typography.Text>
          </Col>
        </Row>
      ))}
    </Modal>
  );
}
