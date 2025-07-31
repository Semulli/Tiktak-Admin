// store/useCompanyStore.ts
import { create } from "zustand";
import type { CompanyStore } from "../interface";





export const useCompanyStore = create<CompanyStore>((set) => ({
  companies: [],
  setCompanies: (companies) => set({ companies }),

  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
  removeCompany: (id) =>
    set((state) => ({
      companies: state.companies.filter((company) => company.id !== id),
    })),

  updateCompany: (id, updatedCompany) =>
    set((state) => ({
      companies: state.companies.map((company) =>
        company.id === id ? { ...company, ...updatedCompany } : company
      ),
    })),
}));
