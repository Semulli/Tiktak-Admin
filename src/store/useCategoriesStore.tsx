// store/usecategoryStore.ts
import { create } from "zustand";
import type { CategoryStore } from "../interface";

export const useCategoriesStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),

  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),

  updateCategory: (id, updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      ),
    })),
}));
