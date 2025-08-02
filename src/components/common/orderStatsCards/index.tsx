import React from "react";
import { Card, Typography } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CheckSquareOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import type { Product } from "../../../interface";

const { Text } = Typography;

enum IStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  total_price: string;
}
export interface IOrder {
  items: OrderItem[];
  id: number;
  orderNumber: string;
  total: string;
  deliveryFee: string;
  paymentMethod: string;
  status: IStatus;
  note: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  orders: IOrder[];
}

export default function OrderStatsCards({ orders }: Props) {
  const totalAmount = orders.reduce(
    (acc, order) => acc + parseFloat(order.total),
    0
  );
  const totalCount = orders.length;

  const statusCounts: Record<IStatus, number> = {
    [IStatus.PENDING]: 0,
    [IStatus.CONFIRMED]: 0,
    [IStatus.DELIVERED]: 0,
    [IStatus.CANCELLED]: 0,
  };

  orders.forEach((order) => {
    const status = order.status as IStatus;
    if (statusCounts[status] !== undefined) {
      statusCounts[status]++;
    }
  });

  const statusInfo: Record<
    IStatus,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    [IStatus.PENDING]: {
      label: "Gözləmədə",
      color: "#fa8c16",
      icon: <ClockCircleOutlined style={{ fontSize: 14 }} />,
    },
    [IStatus.CONFIRMED]: {
      label: "Təsdiqləndi",
      color: "#13c2c2",
      icon: <CheckCircleOutlined style={{ fontSize: 14 }} />,
    },
    [IStatus.DELIVERED]: {
      label: "Çatdırıldı",
      color: "#52c41a",
      icon: <CheckSquareOutlined style={{ fontSize: 14 }} />,
    },
    [IStatus.CANCELLED]: {
      label: "Ləğv edildi",
      color: "#f5222d",
      icon: <CloseCircleOutlined style={{ fontSize: 14 }} />,
    },
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      <MiniCard
        label="Toplam ₼"
        value={totalAmount.toFixed(2)}
        icon={<ShoppingOutlined style={{ fontSize: 14 }} />}
        color="#3f8600"
      />
      <MiniCard
        label="Sifariş sayı"
        value={String(totalCount)}
        icon={<ShoppingOutlined style={{ fontSize: 14 }} />}
      />

      {Object.entries(statusCounts).map(([status, count]) => {
        const typedStatus = status as IStatus;
        const info = statusInfo[typedStatus];
        return (
          <MiniCard
            key={status}
            label={info.label}
            value={String(count)}
            icon={info.icon}
            color={info.color}
          />
        );
      })}
    </div>
  );
}

interface MiniCardProps {
  label: string;
  value: string;
  color?: string;
  icon?: React.ReactNode;
}

function MiniCard({ label, value, color = "#595959", icon }: MiniCardProps) {
  return (
    <Card
      size="small"
      style={{
        padding: "1px 5px",
        minWidth: 130,
        height: 44,
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <Text type="secondary" style={{ fontSize: 10 }}>
        {label}
      </Text>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {icon}
        <Text strong style={{ fontSize: 13, color, margin: 0 }}>
          {value}
        </Text>
      </div>
    </Card>
  );
}
