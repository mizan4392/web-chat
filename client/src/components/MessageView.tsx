import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGroupMessages } from "../http/message.http";
import { Flex, notification } from "antd";
import { useMessageStore } from "../store/message.store";
import { useGeneralStore } from "../store/general.store";
import ChatMessage from "./ChatMessage";

export default function MessageView() {
  const [page, setPage] = useState(1);
  const { messages, setMessages } = useMessageStore();
  const { groupId } = useParams();
  const { user } = useGeneralStore();
  console.log(user);

  useEffect(() => {
    if (groupId) {
      fetchGroupMessages({ groupId: parseInt(groupId as string), page })
        .then((data) => {
          setMessages(data);
        })
        .catch((e) => {
          notification.error({
            message: e?.message,
          });
        });
    }
  }, [groupId]);
  return (
    <div className="h-full w-full message-view">
      <Flex className="h-full w-full" gap={"middle"} vertical>
        {messages.map((message) => (
          <Flex
            key={message.id}
            justify={message.userId === user?.id ? "right" : "left"}
            className="w-full"
          >
            <ChatMessage
              user={message.user}
              text={message.message}
              isOwnerMessage={message.userId === user?.id}
              time={message.createdAt}
            />
          </Flex>
        ))}
      </Flex>
    </div>
  );
}
