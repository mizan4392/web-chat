import { Flex } from "antd";
import MessageInput from "../components/MessageInput";
import MessageView from "../components/MessageView";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reinitializeSocket, socket } from "../http/socket";

export default function MessageLayout() {
  const { groupId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket || !groupId?.trim()) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let retryTimeout: any = null;

    const joinGroup = () => {
      socket.emit("joinGroup", groupId, (response: { success: boolean }) => {
        if (response?.success) {
          console.log("Joined group successfully");
        } else {
          reinitializeSocket();
          retryTimeout = setTimeout(joinGroup, 2000); // retry after 2s
        }
      });
    };

    if (socket.connected) {
      joinGroup();
    } else if (socket.disconnected) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      socket.once("connect", joinGroup);
    }

    return () => {
      clearTimeout(retryTimeout);
    };
  }, [socket, groupId]);
  return (
    <Flex gap={"middle"} vertical className="h-full">
      <Flex flex={7}>
        <MessageView />
      </Flex>
      <Flex flex={1} align="center">
        <MessageInput />
      </Flex>
    </Flex>
  );
}
