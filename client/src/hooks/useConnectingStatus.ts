import { useEffect, useState } from "react";
import { socket } from "../http/socket";

export default function useSocketStatus() {
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("=======Socket connected========");
      setStatus("connected");
    });

    socket.on("disconnect", () => {
      console.log("=======Socket disconnected========");
      setStatus("disconnected");
    });

    socket.io.on("reconnect_attempt", () => {
      console.log("=======Socket reconnecting========");

      setStatus("reconnecting");
    });

    socket.io.on("reconnect", () => {
      console.log("=======Socket reconnected========");
      setStatus("connected");
    });

    socket.on("connect_error", () => {
      console.log("=======Socket connect error========");
      setStatus("reconnecting");
    });

    socket.on("auth_error", () => {
      console.log("=======Socket auth error========");
      setStatus("reconnecting");
    });
    socket.on("error", (error) => {
      console.log("=======Socket error========", error);
      setStatus("error");
    });
    socket.on("reconnect_error", (error) => {
      console.log("=======Socket reconnect error========", error);
      setStatus("error");
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.io.off("reconnect_attempt");
      socket.io.off("reconnect");
    };
  }, []);
  console.log("=======Socket status======= from useSocketStatus hook:", status);
  return status;
}
