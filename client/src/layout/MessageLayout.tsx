import { Flex } from "antd";
import MessageInput from "../components/MessageInput";
import MessageView from "../components/MessageView";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../http/socket";

export default function MessageLayout() {
  const { groupId } = useParams();

  useEffect(() => {
    if (groupId?.trim() !== "") {
      // Fetch messages here
      socket.emit("joinGroup", groupId);
    }
    return () => {
      socket.off("joinGroup");
    };
  }, [groupId]);
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
