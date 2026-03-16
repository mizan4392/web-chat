import { useEffect, useState } from "react";
import { socket } from "../http/socket";

export default function useSocketStatus() {
  const [status, setStatus] = useState("connecting");

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
      setStatus("connected");
    });

    socket.on("connect_error", () => {
      setStatus("reconnecting");
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
