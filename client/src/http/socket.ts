import io from "socket.io-client";
import { getSessionToken } from "./http";

export const socket = io("http://localhost:3000", {
  extraHeaders: {
    Authorization: `Bearer ${getSessionToken()}`, // Pass the JWT token here
  },
});
