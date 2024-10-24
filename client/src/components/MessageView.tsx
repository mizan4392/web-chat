/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGroupMessages } from "../http/message.http";
import { Flex, notification } from "antd";
import { useMessageStore } from "../store/message.store";
import { useGeneralStore } from "../store/general.store";
import ChatMessage from "./ChatMessage";
import { socket } from "../http/socket";
import { Message } from "../store/types";

export default function MessageView() {
  const [page, setPage] = useState(1);
  const { messages, setMessages, addMessage, addMessages } = useMessageStore();
  const { groupId } = useParams();
  const { user } = useGeneralStore();
  const scrollRef: any = useRef(null);
  const bottomRef: any = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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

      socket.on("receiveMessage", (newMessage: Message) => {
        addMessage(newMessage);
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
    return () => {
      socket.off("receiveMessage");
    };
  }, [groupId]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current.scrollTop === 0) {
        setPage((prevPage) => prevPage + 1);
        fetchGroupMessages({
          groupId: parseInt(groupId as string),
          page: page + 1,
        })
          .then((data) => {
            // Handle fetched data
            addMessages(data);
          })
          .catch((e) => {
            console.error(e);
          });
        console.log("User has scrolled to the top");
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      setPage(1);
    };
  }, [groupId, page]);
  return (
    <div className="h-full w-full message-view" ref={scrollRef}>
      <Flex className="h-full w-full" gap={"middle"} vertical>
        {messages.map((message) => {
          return (
            <Flex
              key={message.id}
              justify={message.userId === user?.id ? "right" : "left"}
              className="w-full p-3"
            >
              <ChatMessage
                user={message.user}
                text={message.message}
                isOwnerMessage={message.userId === user?.id}
                time={message.createdAt}
              />
            </Flex>
          );
        })}
        <div ref={bottomRef} />
      </Flex>
    </div>
  );
}
