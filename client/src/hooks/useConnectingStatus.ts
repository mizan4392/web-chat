import { useEffect, useState } from "react";
import { socket } from "../http/socket";

export default function useSocketStatus() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      setStatus("connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setStatus("disconnected");
    });

    socket.io.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect to WebSocket server");
      setStatus("reconnecting");
    });

    socket.io.on("reconnect", () => {
      console.log("Reconnected to WebSocket server");
      setStatus("reconnect");
    });

    socket.on("connect_error", () => {
      console.log("Error occurred while connecting to WebSocket server");
      setStatus("connect_error");
    });

    socket.on("auth_error", () => {
      console.log("Authentication error occurred");
      setStatus("auth_error");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.io.off("reconnect_attempt");
      socket.io.off("reconnect");
    };
  }, []);

  return status;
}
