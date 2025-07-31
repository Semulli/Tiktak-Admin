// src/interface/index.ts

export enum ProductMeasure {
  KG = "kg",
  GR = "gr",
  LITRE = "litre",
  ML = "ml",
  METER = "meter",
  CM = "cm",
  MM = "mm",
  PIECE = "piece",
  PACKET = "packet",
  BOX = "box",
}

export enum OrderStatus {
  Pending = "PENDING",
  Ready = "READY",
  Preparing = "PREPARING",
  Confirmed = "CONFIRMED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED",
}

export interface UploadResponse {
  url: string;
}
export interface Product {
  id?: number;
  title: string;
  description: string;
  price: string;
  type: ProductMeasure;
  img_url?: string;
  created_at?: string;
  category_id: number;
  category?: {
    id: number;
    name: string;
  };
}

export interface Company {
  id?: number;
  title: string;
  description: string;
  img_url: string;
  created_at?: string;
}

export interface Category {
  id?: number;
  name: string;
  description: string;
  img_url: string;
  created_at?: string;
}

export interface User {
  id?: number;
  full_name: string;
  phone: string;
  created_at?: string;
}
export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  total_price: string;
}
export interface Order {
  items: OrderItem[];
  id: number;
  orderNumber: string;
  total: string;
  deliveryFee: string;
  paymentMethod: string;
  status: OrderStatus;
  note: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyStore {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  addCompany: (company: Company) => void;
  removeCompany: (id: number) => void;
  updateCompany: (id: number, updatedCompany: Partial<Company>) => void;
}

export interface CategoryStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  removeCategory: (id: number) => void;
  updateCategory: (id: number, updatedcategory: Partial<Category>) => void;
}

export interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  onSubmit?: () => Promise<void>; // optional edin əgər lazım deyilsə
}
