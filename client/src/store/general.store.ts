import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ModalType =
  | "CreateGroup"
  | "JoinGroup"
  | "InviteToGroup"
  | "UpdateGroup"
  | "ManageMembers"
  | "DeleteGroup";

interface GeneralStore {
  activeModal: ModalType | null;
  setActiveModal: (modal: ModalType | null) => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      setActiveModal: (modal) => set({ activeModal: modal }),
    }),

    {
      name: "general-store",
    }
  )
);
