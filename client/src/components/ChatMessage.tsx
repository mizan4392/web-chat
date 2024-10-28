import { Card, Tooltip } from "antd";
import { User } from "../store/types";
import { format } from "date-fns";

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
              <img src={imageUrl} alt="image" className="w-80 h-80" />
            )}
            {fileType === "video" && (
              <video src={imageUrl} controls className="w-80 h-80" />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
