import React, { useState, useEffect } from "react";
import Modal from "../../custom/Modal";
import toast from "react-hot-toast";
import type { Category } from "../../../interface";
import { uploadFile } from "../../../services/fetchData";
import { useSidebarStore } from "../../../store/sidebarStore";

interface CategoriesModalProps {
  onClose: () => void;
  onSubmit: (data: Category) => Promise<void>;
  initialData?: Category | null;
}

const CategoriesModal = ({
  onClose,
  onSubmit,
  initialData = null,
}: CategoriesModalProps) => {
  const { newImg } = useSidebarStore();

  const [category, setCategory] = useState<Category>({
    id: initialData?.id || undefined,
    name: "",
    description: "",
    img_url: newImg,
  });

  useEffect(() => {
    if (initialData) {
      setCategory(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadFile(file);

      setCategory((prev) => ({
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

    const { name, description, img_url } = category;

    if (!name || !description) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }

    if (!img_url) {
      toast.error("Zəhmət olmasa şəkil yükləyin.");
      return;
    }

    try {
      await onSubmit(category);
      toast.success(
        initialData ? "Kateqoriya yeniləndi!" : "Kateqoriya yaradıldı!"
      );
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
      <label>Şəkil seç</label>
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded mb-3"
        onChange={handleFileChange}
      />

      <label>Başlıq</label>
      <input
        type="text"
        name="name"
        value={category.name}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="Kateqoriya başlığı"
      />

      <label>Açıqlama</label>
      <textarea
        name="description"
        value={category.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="Kateqoriya açıqlaması"
      />
    </Modal>
  );
};

export default CategoriesModal;
