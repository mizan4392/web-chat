import io from "socket.io-client";
import { getSessionToken } from "./http"; // Assume refreshSessionToken is implemented
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string;
let socket = io(SOCKET_URL, {
  extraHeaders: {
    Authorization: `Bearer ${getSessionToken()}`, // Pass the JWT token here
  },
});

const reinitializeSocket = async () => {
  const newToken = await getSessionToken(); // Refresh the JWT token
  socket = io(SOCKET_URL, {
    extraHeaders: {
      Authorization: `Bearer ${newToken}`, // Use the new JWT token
    },
  });
  setupSocketListeners();
};

const setupSocketListeners = () => {
  socket.on("connect_error", async (error) => {
    console.error("Socket connection error:", error);
    if (error.message === "jwt expired") {
      await reinitializeSocket();
    }
  });

  // Add other event listeners here
};

setupSocketListeners();

export { socket };
