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
  setMessages: (messages) => set({ messages: sortMessages(messages) }),
  addMessages(messages) {
    set((state) => ({
      messages: sortMessages([...state.messages, ...sortMessages(messages)]),
    }));
  },
  addMessage: (message) =>
    set((state) => ({ messages: sortMessages([...state.messages, message]) })),
}));

const sortMessages = (messages: Message[]) => {
  return messages.sort((a, b) => {
    return a.id - b.id;
  });
};
