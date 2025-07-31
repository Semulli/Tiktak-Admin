import { useState } from "react";

export const useDeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  return {
    isOpen,
    selectedId,
    openModal,
    closeModal,
  };
};
