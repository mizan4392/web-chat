import { Card, Modal, Tooltip } from "antd";
import { User } from "../store/types";
import { format } from "date-fns";
import { useState } from "react";

type ChatMessageProps = {
  text: string;
  user: User;
  imageUrl?: string;
  isOwnerMessage?: boolean;
  time: string;
  fileType?: string;
};
export default function ChatMessage({
  text,
  user,
  imageUrl,
  fileType,
  isOwnerMessage,
  time,
}: ChatMessageProps) {
  const formattedTime = format(new Date(time), "PPpp"); // Format the datetime
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleImageClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="w-full">
      <div className="text-xs text-gray-400 text-center">{formattedTime}</div>
      <div
        className={`flex  items-center gap-3 ${
          isOwnerMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="rounded-full w-5 h-5">
          <Tooltip title={user.name}>
            <img src={user.imageUrl} className="rounded-full cursor-pointer" />
          </Tooltip>
        </div>
        <Card
          styles={{
            body: {
              padding: 8,
            },
          }}
        >
          <div>
            {text && <span>{text}</span>}
            {fileType === "image" && (
              <img
                src={imageUrl}
                alt="image"
                className="w-80 h-80 cursor-pointer"
                onClick={handleImageClick}
              />
            )}
            {fileType === "video" && (
              <video src={imageUrl} controls className="w-80 h-80" />
            )}
          </div>
        </Card>
      </div>
      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={handleModalClose}
        centered
      >
        <img
          src={imageUrl}
          alt="Full Image"
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>
    </div>
  );
}
