// services/fetchCompanies.ts
import type { Category, Company, OrderStatus, Product, } from "../interface";
import api from "./api";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//  Products
export const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await api.get("/admin/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = async (productData: Product) => {
  try {
    // const token = localStorage.getItem("access_token");
    const response = await api.post("/admin/product", productData, {
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/admin/products/${id}`);
  return response.data;
};

export const updateProduct = async (id: number, data: Product) => {
  const response = await api.put(`/admin/products/${id}`, data);
  return response.data;
};

//Campaigns
export const fetchCompanies = async () => {
  const response = await api.get("/admin/campaigns");
  return response.data;
};

export const createCompanies = async (data: Company) => {
  const response = await api.post("/admin/campaign", data);
  return response.data;
};

export const deleteCompany = async (id: number) => {
  const response = await api.delete(`/admin/campaigns/${id}`);
  return response.data;
};

export const updateCompany = async (id: number, data: Company) => {
  const response = await api.put(`/admin/campaigns/${id}`, data);
  return response.data;
};

//Categories
export const fetchCategories = async () => {
  const response = await api.get("/admin/categories");
  return response.data;
};

export const createCategories = async (data: Category) => {
  const response = await api.post("/admin/category", data);
  return response.data;
};

export const deleteCategories = async (id: number) => {
  const response = await api.delete(`/admin/categories/${id}`);
  return response.data;
};

export const updateCategories = async (id: number, data: Category) => {
  const response = await api.put(`/admin/categories/${id}`, data);
  return response.data;
};

// users

export const getUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Order
export const getOrders = async () => {
  const response = await api.get("/orders/admin");
  return response.data;
}

export const updateOrderStatus = async (id: number, status: OrderStatus) => {
  return await api.put(`orders/admin/${id}/status`, { status });
};

export const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // ✅ Backend cavabına əsasən:
    const url = response.data.data.url;

    if (!url) {
      throw new Error("URL boş gəldi");
    }

    return { url };
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};






