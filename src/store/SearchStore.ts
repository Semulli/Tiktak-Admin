import { create } from "zustand";

interface SearchState {
  text: string;
  setText: (value: string) => void;
  clear: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  text: "",
  setText: (value) => set({ text: value }),
  clear: () => set({ text: "" }),
}));