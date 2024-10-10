import { ModalType, useGeneralStore } from "../store/general.store";

export function useModal(modalType: ModalType) {
  const { activeModal, setActiveModal } = useGeneralStore();
  const isOpen = activeModal === modalType;
  const openModal = () => setActiveModal(modalType);

  const closeModal = () => setActiveModal(null);

  return { isOpen, openModal, closeModal };
}
