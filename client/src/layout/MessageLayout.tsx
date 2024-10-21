import { Flex } from "antd";
import MessageInput from "../components/MessageInput";
import MessageView from "../components/MessageView";

export default function MessageLayout() {
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
