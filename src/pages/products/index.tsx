import { useEffect, useState } from "react";
import Table from "../../components/custom/Table";
import { Layout } from "../../layout";
import type { Product } from "../../interface";
import { fetchProducts, deleteProduct } from "../../services/fetchData";
import ProdutsModal from "../../components/common/ProductsModal";
import DeleteModal from "../../components/custom/Modal/DeleteModal";
import { useDeleteModal, useEditModal } from "../../components/common/hooks";
import toast from "react-hot-toast";
import { useSearchStore } from "../../store/SearchStore";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { text: searchText } = useSearchStore();
  const { isOpen, selectedId, openModal, closeModal } = useDeleteModal();
  const {
    isOpen: isEditOpen,
    editingItem: selectedProduct,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useEditModal<Product>();

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Məhsullar yüklənmədi:", error);
      toast.error("Məhsullar yüklənmədi");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const query = searchText.toLowerCase();
    return (
      product.title.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  });

  const handleDelete = async () => {
    if (selectedId === null) return;
    try {
      await deleteProduct(selectedId);
      toast.success("Məhsul silindi!");
      closeModal();
      getProducts();
    } catch (error) {
      console.error(error);
      toast.error("Silinmə uğursuz oldu");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Columns tipini ayrıca dəyişən kimi təyin etdik
  const columns: Column<Product>[] = [
    { key: "id", label: "ID" },
    { key: "title", label: "Başlıq" },
    { key: "description", label: "Təsvir" },
    {
      key: "img_url",
      label: "Şəkil",
      render: (row) => (
        <img
          src={row.img_url}
          alt={row.title}
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    { key: "price", label: "Qiymət" },
    { key: "type", label: "Ölçü" },
    {
      key: "category_id",
      label: "Kateqoriya",
      render: (row) => row.category?.name || "-",
    },
    {
      key: "created_at",
      label: "Yaranma Tarixi",
      render: (row) =>
        row.created_at
          ? new Date(row.created_at).toLocaleDateString("az-AZ")
          : "-",
    },
  ];

  return (
    <Layout>
      <Table
        title="Məhsullar"
        data={filteredProducts}
        onCreate={getProducts}
        isLoading={loading}
        columns={columns}
        actions={(row: Product) => (
          <>
            <button
              className="text-blue-600 hover:underline mr-3"
              onClick={() => openEditModal(row)}
            >
              Düzəlt
            </button>
            <button
              className="text-red-600 hover:underline"
              onClick={() => openModal(Number(row.id))}
            >
              Sil
            </button>
          </>
        )}
        ModalComponent={(props) => (
          <ProdutsModal {...props} onSubmit={getProducts} />
        )}
      />

      {isEditOpen && selectedProduct && (
        <ProdutsModal
          initialData={selectedProduct}
          onClose={closeEditModal}
          onSubmit={getProducts}
        />
      )}

      <DeleteModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        onSubmit={handleDelete}
      />
    </Layout>
  );
}

export default Products;
