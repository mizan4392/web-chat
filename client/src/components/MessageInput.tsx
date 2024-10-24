import { FileAddOutlined, SendOutlined } from "@ant-design/icons";
import { Col, Input, notification, Row, Tooltip, Upload } from "antd";
import React from "react";

import { useParams } from "react-router-dom";
import { sendMessage } from "../http/message.http";

export default function MessageInput() {
  const [message, setMessage] = React.useState("");

  const { groupId } = useParams();
  const onSendMessage = () => {
    sendMessage({
      message,
      groupId: parseInt(groupId as string),
    })
      .then(() => {
        setMessage("");
      })
      .catch((e) => {
        notification.error({
          message: e?.message,
        });
      });
  };

  const onFileUpload = (files) => {
    console.log(files);
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
          <Tooltip title="Attach">
            <Upload onChange={(files) => onFileUpload(files)}>
              <FileAddOutlined className=" cursor-pointer" />
            </Upload>
          </Tooltip>
          {/* <FileAddOutlined /> */}
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
