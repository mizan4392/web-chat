import { useEffect, useState } from "react";
import { socket } from "../http/socket";

export default function useSocketStatus() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setStatus("connected");
    });

    socket.on("disconnect", () => {
      setStatus("disconnected");
    });

    socket.io.on("reconnect_attempt", () => {
      setStatus("reconnecting");
    });

    socket.io.on("reconnect", () => {
      setStatus("reconnect");
    });

    socket.on("connect_error", () => {
      setStatus("connect_error");
    });

    socket.on("auth_error", () => {
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
