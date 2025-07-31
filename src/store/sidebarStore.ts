// import { string } from "yup";
import { create } from "zustand";

type SidebarStore = {
  newImg: string;
  setNewImg: (img: string) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  newImg: "",
  setNewImg: (img) => set({ newImg: img }),
}));
