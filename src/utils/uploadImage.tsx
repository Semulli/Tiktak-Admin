import { useState } from "react";
import axios from "axios";
import { useSidebarStore } from "../store/sidebarStore";

const useImageUpload = () => {
  const setNewImg = useSidebarStore((state) => state.setNewImg);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    try {
      // Preview üçün base64 göstər
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewImg(reader.result as string);
      };

      await new Promise((resolve, reject) => {
        reader.onloadend = resolve;
        reader.onerror = reject;
      });

      // FormData ilə yükləmə
      const formData = new FormData();
      formData.append("img_url", file);

      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "https://api.sarkhanrahimli.dev/api/tiktak/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server cavabı:", response.data);

      const imageUrl = response.data?.url;
      if (imageUrl) {
        setNewImg(imageUrl);
        return imageUrl;
      } else {
        throw new Error("Server image URL göndərmədi");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handleImageUpload, loading };
};

export default useImageUpload;
