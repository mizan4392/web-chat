import { Card, Tooltip } from "antd";
import { User } from "../store/types";
import { format } from "date-fns";

type ChatMessageProps = {
  text: string;
  user: User;
  imageUrl?: string;
  isOwnerMessage?: boolean;
  time: string;
};
export default function ChatMessage({
  text,
  user,
  imageUrl,
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
            <span>{text}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
