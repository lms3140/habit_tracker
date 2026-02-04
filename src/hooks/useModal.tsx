import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalClose = () => {
    setIsModalOpen(false);
  };
  const modalOpen = () => {
    setIsModalOpen(true);
  };
  return { isModalOpen, modalClose, modalOpen };
};
