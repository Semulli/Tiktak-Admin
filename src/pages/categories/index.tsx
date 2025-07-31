import { useEffect, useState } from "react";
import { Layout } from "../../layout";
import {
  fetchCategories,
  deleteCategories,
  createCategories,
  updateCategories,
} from "../../services/fetchData";
import { useNavigate } from "react-router";
import { ROUTER } from "../../constant/router";
import DeleteModal from "../../components/custom/Modal/DeleteModal";
import { useDeleteModal } from "../../components/common/hooks/Modals/useDeleteModal";
import Table from "../../components/custom/Table";
import type { Category } from "../../interface";
import toast from "react-hot-toast";
import CategoriesModal from "../../components/common/CategoriesModal";
import { useEditModal } from "../../components/common/hooks";

function Categories() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { isOpen, selectedId, openModal, closeModal } = useDeleteModal();

  const {
    isOpen: isEditOpen,
    editingItem: selectedCategory,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useEditModal<Category>();

  const fetchDatas = async () => {
    try {
      setLoading(true);
      const res = await fetchCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Kateqoriyalar yüklənərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate(ROUTER.LOGIN);
    }
    fetchDatas();
  }, [navigate]);

  const handleCreate = async (newData: Category) => {
    try {
      const created = await createCategories(newData);
      setCategories((prev) => [created.data, ...prev]);
      // toast.success("Yeni kateqoriya əlavə olundu.");
    } catch (err) {
      console.log(err);
      toast.error("Əlavə edilərkən xəta baş verdi.");
    }
  };

  const handleEditSubmit = async (updatedCategory: Category) => {
    try {
      const updated = await updateCategories(
        updatedCategory.id as number,
        updatedCategory
      );
      setCategories((prev) =>
        prev.map((el) => (el.id === updated.data.id ? updated.data : el))
      );
      toast.success("Kateqoriya yeniləndi.");
    } catch (err) {
      console.log(err);
      toast.error("Yenilənmə zamanı xəta baş verdi.");
    } finally {
      closeEditModal();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedId) return;
    try {
      await deleteCategories(selectedId);
      setCategories((prev) => prev.filter((el) => el.id !== selectedId));
      toast.success("Kateqoriya silindi.");
    } catch (err) {
      console.log(err);
      toast.error("Silinərkən xəta baş verdi.");
    } finally {
      closeModal();
    }
  };

  return (
    <Layout>
      <Table<Category>
        title="Kateqoriyalar"
        data={categories}
        ModalComponent={CategoriesModal}
        onCreate={handleCreate}
        isLoading={loading}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Başlıq" },
          { key: "description", label: "Açıqlama" },
          { key: "img_url", label: "Şəkil" },
          { key: "created_at", label: "Yaranma Tarixi" },
        ]}
        actions={(row) => (
          <>
            <button className=" mr-3" onClick={() => openEditModal(row)}>
              düzəlt
            </button>
            <button onClick={() => openModal(Number(row.id))}>sil</button>
          </>
        )}
      />

      <DeleteModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        onSubmit={handleDeleteConfirm}
      />

      {isEditOpen && selectedCategory && (
        <CategoriesModal
          initialData={selectedCategory}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
        />
      )}
    </Layout>
  );
}

export default Categories;
