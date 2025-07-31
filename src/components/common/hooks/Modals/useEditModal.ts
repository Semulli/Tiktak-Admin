import { useState } from "react";

export const useEditModal = <T>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const openModal = (item: T) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setEditingItem(null);
    setIsOpen(false);
  };

  return {
    isOpen,
    editingItem,
    openModal,
    closeModal,
  };
};
