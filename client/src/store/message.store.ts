import { create } from "zustand";
import { Message } from "./types";

interface MessageStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  addMessages: (messages: Message[]) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessages(messages) {
    set((state) => ({ messages: [...state.messages, ...messages] }));
  },
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
