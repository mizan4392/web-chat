import { FileAddOutlined, SendOutlined } from "@ant-design/icons";
import { Col, Input, notification, Row, Tooltip } from "antd";
import React from "react";
import { sendMessage } from "../http/message.http";
import { useParams } from "react-router-dom";

export default function MessageInput() {
  const [message, setMessage] = React.useState("");
  const { groupId } = useParams();
  const onSendMessage = () => {
    console.log(message);
    sendMessage({
      message,
      groupId: parseInt(groupId as string),
    })
      .then((data) => {
        setMessage("");
        console.log(data);
      })
      .catch((e) => {
        notification.error({
          message: e?.message,
        });
      });
  };
  return (
    <div className="w-full">
      <Row gutter={9}>
        <Col span={20} className=" justify-center">
          <Input
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </Col>
        <Col
          span={2}
          className=" justify-center"
          style={{
            textAlign: "center",
          }}
        >
          <FileAddOutlined />
        </Col>
        <Col
          span={2}
          style={{
            textAlign: "center",
          }}
        >
          <Tooltip title="Send">
            <SendOutlined className=" cursor-pointer" onClick={onSendMessage} />
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
}
