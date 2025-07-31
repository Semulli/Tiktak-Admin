// ProductModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "../../custom/Modal";
import toast from "react-hot-toast";
import {
  ProductMeasure,
  type Category,
  type Product,
} from "../../../interface";
import { useSidebarStore } from "../../../store/sidebarStore";
import {
  addProduct,
  fetchCategories,
  updateProduct,
  uploadFile,
} from "../../../services/fetchData";

interface ProductModalProps {
  onClose: () => void;
  initialData?: Product | null;
  onSubmit?: () => Promise<void>;
}

const ProductModal = ({
  onClose,
  initialData = null,
  onSubmit = async () => {},
}: ProductModalProps) => {
  const { newImg } = useSidebarStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    price: "",
    type: "" as ProductMeasure,
    img_url: newImg,
    category_id: 1,
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res.data);
      } catch (err) {
        toast.error("Kateqoriyalar yüklənmədi.");
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setProduct({
        ...initialData,
        price: String(initialData.price), // string olaraq saxla
        category_id: initialData.category?.id ?? initialData.category_id,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "category_id" ? Number(value) : value,
    }));
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, price, type, img_url, category_id } = product;

    if (!title || !description || !price || !type || !category_id) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }

    try {
      // Backend enum uyğunluğu üçün:
      // type ya "kg", ya "piece", ya "litre" olmalı!
      // Əgər interface-də fərqlidirsə düzəlt.
      const validTypes = [
        "kg",
        "gr",
        "litre",
        "ml",
        "meter",
        "cm",
        "mm",
        "piece",
        "packet",
        "box",
      ];

      if (!validTypes.includes(type)) {
        toast.error(`Ölçü tipi yalnışdır. Seçimlərdən biri olmalıdır.`);
        return;
      }

      const payload: Product = {
        ...product,
        price: String(price).trim(), // Backend string istəyir
        img_url: img_url?.trim() || undefined, // boşsa undefined
        category_id: Number(category_id),
      };

      console.log("🚀 Göndərilən payload:", payload);

      if (initialData?.id) {
        await updateProduct(initialData.id, payload);
        toast.success("Məhsul yeniləndi!");
      } else {
        await addProduct(payload);
        toast.success("Məhsul əlavə olundu!");
      }

      onClose();
      await onSubmit?.();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Xəta baş verdi! Məlumatları yoxlayın.");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadFile(file);
      setProduct((prev) => ({
        ...prev,
        img_url: res.url,
      }));
      toast.success("Şəkil uğurla yükləndi");
    } catch (error) {
      toast.error("Şəkil yüklənərkən xəta baş verdi");
      console.error("Upload error:", error);
    }
  };

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleSubmitProduct}
      submitText={initialData ? "Yenilə" : "Əlavə et"}
    >
      <label>Şəkil</label>
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
        value={product.title}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="Məhsul adı"
      />

      <label>Açıqlama</label>
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="Məhsul təsviri"
      />

      <label>Qiymət</label>
      <input
        type="text"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="8.90"
      />

      <label>Ölçü vahidi</label>
      <select
        name="type"
        value={product.type}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3"
      >
        <option value="">Seçin</option>
        {Object.entries(ProductMeasure).map(([key, val]) => (
          <option key={key} value={val}>
            {val.charAt(0).toUpperCase() + val.slice(1)}
          </option>
        ))}
      </select>

      <label>Kateqoriya</label>
      <select
        name="category_id"
        value={product.category_id}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3"
      >
        <option value="">Kateqoriya seçin</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </Modal>
  );
};

export default ProductModal;
