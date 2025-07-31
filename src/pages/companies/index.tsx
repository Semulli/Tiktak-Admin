import { useEffect, useState } from "react";
import { Layout } from "../../layout";
import {
  fetchCompanies,
  createCompanies,
  deleteCompany,
  updateCompany,
} from "../../services/fetchData";
import { useNavigate } from "react-router";
import { ROUTER } from "../../constant/router";
import DeleteModal from "../../components/custom/Modal/DeleteModal";
import { useDeleteModal } from "../../components/common/hooks/Modals/useDeleteModal";
import Table from "../../components/custom/Table";
import CompanyModal from "../../components/common/CompanyModal";
import type { Company } from "../../interface";
import toast from "react-hot-toast";
import { useEditModal } from "../../components/common/hooks";

function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, selectedId, openModal, closeModal } = useDeleteModal();

  const {
    isOpen: isEditOpen,
    editingItem: selectedCompany,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useEditModal<Company>();

  const fetchDatas = async () => {
    try {
      setLoading(true);
      const data = await fetchCompanies();
      setCompanies(data.data);
    } catch (error) {
      console.log(error);
      toast.error("Kampaniyalar yüklənərkən xəta baş verdi.");
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

  const handleCreate = async (newData: Company) => {
    try {
      const created = await createCompanies(newData);
      setCompanies((prev) => [created.data, ...prev]);
      // toast.success("Yeni kampaniya əlavə olundu.");
    } catch (err) {
      console.log(err);
      toast.error("Əlavə edilərkən xəta baş verdi.");
    }
  };

  const handleEditClick = (company: Company) => {
    openEditModal(company); 
  };

  const handleEditSubmit = async (updated: Company) => {
    try {
      const updatedData = await updateCompany(updated.id as number, updated);
      setCompanies((prev) =>
        prev.map((el) =>
          el.id === updatedData.data.id ? updatedData.data : el
        )
      );
      toast.success("Kampaniya yeniləndi.");
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
      await deleteCompany(selectedId);
      setCompanies((prev) => prev.filter((el) => el.id !== selectedId));
      toast.success("Kampaniya silindi.");
    } catch (err) {
      console.log(err);
      toast.error("Silinərkən xəta baş verdi.");
    } finally {
      closeModal();
    }
  };

  return (
    <Layout>
      <Table<Company>
        title="Kampaniyalar"
        data={companies}
        ModalComponent={CompanyModal}
        onCreate={handleCreate}
        isLoading={loading}
        columns={[
          { key: "id", label: "ID" },
          { key: "title", label: "Başlıq" },
          { key: "description", label: "Açıqlama" },
          { key: "img_url", label: "Şəkil" },
          { key: "created_at", label: "Yaranma Tarixi" },
        ]}
        actions={(row) => (
          <>
            <button
              className=" mr-3"
              onClick={() => handleEditClick(row)}
            >
              düzəlt
            </button>
            <button
             
              onClick={() => openModal(Number(row.id))}
            >
              sil
            </button>
          </>
        )}
      />

      <DeleteModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        onSubmit={handleDeleteConfirm}
      />

      {isEditOpen && selectedCompany && (
        <CompanyModal
          initialData={selectedCompany}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
        />
      )}
    </Layout>
  );
}

export default Companies;
