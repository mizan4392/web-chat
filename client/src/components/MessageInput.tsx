import { FileAddOutlined, SendOutlined } from "@ant-design/icons";
import { Col, Input, Row, Tooltip } from "antd";
import React from "react";

export default function MessageInput() {
  const [message, setMessage] = React.useState("");
  const onSendMessage = () => {
    console.log(message);
    setMessage("");
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
