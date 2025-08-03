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
import { useSearchStore } from "../../store/SearchStore";

function Companies() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const { isOpen, selectedId, openModal, closeModal } = useDeleteModal();
  const { text: searchText } = useSearchStore();

  const {
    isOpen: isEditOpen,
    editingItem: selectedCompany,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useEditModal<Company>();

  const fetchDatas = async () => {
    try {
      setLoading(true);
      const res = await fetchCompanies();
      setCompanies(res.data || res);
    } catch (error) {
      console.log(error);
      toast.error("Kampaniyalar yüklənərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate(ROUTER.LOGIN);
    else fetchDatas();
  }, [navigate]);

  const handleCreate = async (newData: Company) => {
    try {
      const created = await createCompanies(newData);
      setCompanies((prev) => [created.data || created, ...prev]);
      // toast.success("Yeni kampaniya əlavə olundu.");
    } catch (err) {
      console.log(err);
      toast.error("Əlavə edilərkən xəta baş verdi.");
    }
  };

  const handleEditSubmit = async (updated: Company) => {
    try {
      const updatedData = await updateCompany(updated.id as number, updated);
      setCompanies((prev) =>
        prev.map((el) =>
          el.id === (updatedData.data?.id || updatedData.id)
            ? updatedData.data || updatedData
            : el
        )
      );
      // toast.success("Kampaniya yeniləndi.");
    } catch (err) {
      console.log(err);
      toast.error("Yenilənmə zamanı xəta baş verdi.");
    } finally {
      closeEditModal();
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const q = searchText.toLowerCase();
    return (
      company.title.toLowerCase().includes(q) ||
      company.description?.toLowerCase().includes(q)
    );
  });

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
        data={filteredCompanies}
        onCreate={handleCreate}
        isLoading={loading}
        columns={[
          { key: "id", label: "ID" },
          { key: "img_url", label: "Şəkil" },
          { key: "title", label: "Başlıq" },
          { key: "description", label: "Açıqlama" },
          { key: "created_at", label: "Yaranma Tarixi" },
        ]}
        actions={(row) => (
          <>
            <button className="mr-3" onClick={() => openEditModal(row)}>
              Düzəlt
            </button>
            <button
              className="text-red-700"
              onClick={() => openModal(Number(row.id))}
            >
              Sil
            </button>
          </>
        )}
        ModalComponent={(props) => (
          <CompanyModal {...props} onSubmit={handleCreate} />
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
