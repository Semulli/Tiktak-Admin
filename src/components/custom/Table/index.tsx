import React, { useState } from "react";
import {
  Table as AntTable,
  Modal,
  Typography,
  Image,
  Spin,
  Pagination,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Button from "../Button/index";
import { OrderStatus } from "../../../interface";
import OrderStatsCards, { type IOrder } from "../../common/orderStatsCards";
const { Paragraph } = Typography;

interface ModalProps<T> {
  initialData?: T | null;
  onClose: () => void;
  onSubmit: (data: T) => void;
}

interface TableColumn {
  key: string;
  label: string;
}
interface OrderLike {
  id?: number;
  orderNumber?: string;
  paymentMethod?: string;
  deliveryFee?: string | number;
  total?: string | number;
  status?: OrderStatus;
}

interface TableProps<T> {
  title?: string;
  data: T[];
  columns?: TableColumn[];
  actions?: (row: T) => React.ReactNode;
  ModalComponent?: React.ComponentType<ModalProps<T>>;
  onCreate?: (data: T) => void;
  isLoading?: boolean;
}

function Table<T extends OrderLike>({
  title,
  data = [],
  actions,
  isLoading = false,
  ModalComponent,
  onCreate,
  columns,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 5;
  const paginatedData = Array.isArray(data)
    ? data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : [];
  const statusLabels: Record<OrderStatus, string> = {
    [OrderStatus.Pending]: "Gözləmədə",
    [OrderStatus.Ready]: "hazirdi",
    [OrderStatus.Confirmed]: "Təsdiqləndi",
    [OrderStatus.Preparing]: "Hazırlanır",
    [OrderStatus.Delivered]: "Çatdırıldı",
    [OrderStatus.Cancelled]: "Ləğv edildi",
  };
  const antColumns: ColumnsType<T> =
    columns?.map((col) => ({
      title: col.label,
      dataIndex: col.key,
      key: col.key,
      render: (value: unknown, row: T, index: number): React.ReactNode => {
        if (col.key === "id") {
          return (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
        }

        if (col.key === "img_url") {
          return (
            <Image
              width={30}
              height={25}
              src={String(row[col.key as keyof T])}
            />
          );
        }

        if (
          col.key === "createdAt" ||
          col.key === "created_at" ||
          col.key === "updatedAt"
        ) {
          return String(value).slice(0, 10);
        }
        if (col.key === "paymentMethod") {
          const paymentMethodLabels: Record<string, string> = {
            card: "kartla",
            cash: "nağd",
          };
          return (
            paymentMethodLabels[String(value).toLowerCase()] ??
            String(value).toLowerCase()
          );
        }
        if (col.key === "deliveryFee") {
          return value === "0.00" ? "pulsuz" : `${value} ₼`;
        }
        if (col.key === "paymentAndDelivery") {
          const paymentMethodLabels: Record<string, string> = {
            card: "kartla",
            cash: "nağd",
          };

          const paymentText =
            paymentMethodLabels[String(row.paymentMethod)?.toLowerCase()] ??
            String(row.paymentMethod).toLowerCase();

          const deliveryFee = String(row.deliveryFee);
          const deliveryText =
            deliveryFee === "0.00" ? "pulsuz" : `${deliveryFee} ₼`;

          return `${paymentText} / ${deliveryText}`;
        }

        if (col.key === "total") {
          return `${value} ₼`;
        }

        if (col.key === "status") {
          const status = value as OrderStatus; // cast ettik

          const label = statusLabels[status] || String(value);

          // renk eşlemesi aynı, kullan
          const statusColorMap: Record<string, string> = {
            pending: "orange",
            processing: "blue",
            ready: "yellow",
            cancelled: "red",
            preparing: "geekblue",
            confirmed: "cyan",
            delivered: "green",
          };

          const color = statusColorMap[status.toLowerCase()] || "default";

          return <Tag color={color}>{label}</Tag>;
        }

        if (
          col.key === "description" ||
          col.key === "note" ||
          col.key === "address" ||
          col.key === "orderNumber"
        ) {
          const desc = String(value || "");
          const shortDesc = desc.length > 10 ? desc.slice(0, 10) + "..." : desc;

          return (
            <Paragraph
              style={{ margin: 0, cursor: "pointer" }}
              onClick={() => setDescriptionModal(desc)}
              title={desc}
            >
              {shortDesc}
            </Paragraph>
          );
        }

        return String(value ?? "--");
      },
    })) ?? [];

  if (actions) {
    antColumns.push({
      title: "Əməliyyatlar",
      key: "actions",
      render: (_: unknown, row: T) => actions(row),
    });
  }

  return (
    <>
      <div
        style={{
          padding: 16,
          marginRight: 20,
          background: "#fff",
          borderRadius: 8,
          width: 900,
          height: 445,
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          {title === "Sifarişlər" ? (
            <div style={{ width: "100%" }}>
              <h2 style={{ marginBottom: 8 }}>{title}</h2>
              <OrderStatsCards orders={data as unknown as IOrder[]} />
            </div>
          ) : (
            title && <h2>{title}</h2>
          )}

          {!["Sifarişlər", "İstifadəçilər"].includes(title || "") && (
            <Button
              title="Əlavə et"
              variant="button_type2"
              click={() => setIsModalOpen(true)}
            />
          )}
        </div>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 340,
            }}
          >
            <Spin size="large" className="custom-spin" />
          </div>
        ) : (
          <>
            <AntTable
              columns={antColumns}
              dataSource={paginatedData}
              pagination={false}
              style={{ minHeight: 300 }}
              scroll={{ x: "max-content" }}
              rowKey={(record) => String(record.id) || String(Math.random())}
            />
          </>
        )}
      </div>

      {ModalComponent && isModalOpen && (
        <ModalComponent
          onClose={() => setIsModalOpen(false)}
          onSubmit={(formData: T) => {
            onCreate?.(formData);
            setIsModalOpen(false);
          }}
        />
      )}

      {descriptionModal && (
        <Modal
          open={!!descriptionModal}
          onCancel={() => setDescriptionModal(null)}
          footer={null}
          centered
        >
          <Typography.Text style={{ whiteSpace: "pre-wrap" }}>
            {descriptionModal}
          </Typography.Text>
        </Modal>
      )}
      <div style={{ marginTop: 10, textAlign: "center" }}>
        <Pagination
          current={currentPage}
          pageSize={ITEMS_PER_PAGE}
          total={data.length}
          onChange={setCurrentPage}
          className="custom-pagination"
        />
      </div>
    </>
  );
}

export default Table;
