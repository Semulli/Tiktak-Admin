import React, { useState, useEffect } from "react";
import Modal from "../../custom/Modal";
import toast from "react-hot-toast";
import type { Company } from "../../../interface";
import { uploadFile } from "../../../services/fetchData";
import { useSidebarStore } from "../../../store/sidebarStore";

interface CompanyModalProps {
  onClose: () => void;
  onSubmit?: (data: Company) => Promise<void>; // ✅ burada data qəbul edir
  initialData?: Company | null;
}


const CompanyModal = ({
  onClose,
  onSubmit = async () => {},
  initialData = null,
}: CompanyModalProps) => {
  const { newImg, setNewImg } = useSidebarStore();

  const [company, setCompany] = useState<Company>({
    id: initialData?.id,
    title: "",
    description: "",
    img_url: newImg,
  });

  useEffect(() => {
    if (initialData) {
      setCompany(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadFile(file);
      console.log("✅ Yüklənən şəkil URL:", res.url);

      setCompany((prev) => ({
        ...prev,
        img_url: res.url,
      }));

      toast.success("Şəkil uğurla yükləndi");
    } catch (error) {
      toast.error("Şəkil yüklənərkən xəta baş verdi");
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, img_url } = company;

    if (!title || !description) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }

    if (!img_url) {
      toast.error("Zəhmət olmasa şəkil yükləyin.");
      return;
    }

    try {
      console.log("Göndərilən kampaniya:", company);
      // Submitə göndər
      await onSubmit?.(company as any); 
      toast.success(initialData ? "Kampaniya yeniləndi!" : "Kampaniya yaradıldı!");
      onClose();
    } catch (error) {
      toast.error("Xəta baş verdi!");
      console.error("Submit error:", error);
    }
  };

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText={initialData ? "Yenilə" : "Yarat"}
    >
      <label>Şəkil yüklə</label>
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded mb-3"
        onChange={handleFileChange}
      />

      <label>Başlıq</label>
      <input
        type="text"
        name="title"
        value={company.title}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="Kampaniya başlığı"
      />

      <label>Açıqlama</label>
      <textarea
        name="description"
        value={company.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="Kampaniya açıqlaması"
      />
    </Modal>
  );
};

export default CompanyModal;
