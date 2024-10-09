import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./types";

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

  user: User | null;
  setUser: (User: User | null) => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      setActiveModal: (modal) => set({ activeModal: modal }),
      user: null,
      setUser: (user: User | null) => set({ user }),
    }),

    {
      name: "general-store",
    }
  )
);
