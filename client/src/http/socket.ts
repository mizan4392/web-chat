import io from "socket.io-client";
import { getSessionToken } from "./http"; // Assume refreshSessionToken is implemented
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string;
// let socket = io(SOCKET_URL, {
// extraHeaders: {
//   Authorization: `Bearer ${getSessionToken()}`, // Pass the JWT token here
// },
// });

let socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 2000,
  // auth: {
  //   token: getSessionToken(),
  // },
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
  socket.on("auth_error", async (error) => {
    if (error.message === "jwt expired") {
      await reinitializeSocket();
    }
  });

  // Add other event listeners here
};

setupSocketListeners();

socket.on("connect_error", async (err) => {
  if (err.message === "jwt expired" || err.message === "Unauthorized") {
    try {
      const newToken = await getSessionToken();

      socket.auth = {
        token: newToken,
      };

      socket.connect(); // reconnect with new token
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  }
});

export { socket, reinitializeSocket };
