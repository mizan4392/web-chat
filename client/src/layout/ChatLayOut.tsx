import { Card, Col, Row } from "antd";
import ChatMemberPage from "../pages/ChatMemberPage";
import MessageLayout from "./MessageLayout";

export default function ChatLayOut() {
  return (
    <Row gutter={14} className="h-full">
      <Col md={0} xl={6} xxl={7} className="h-full" sm={0}>
        <Card
          className="h-full"
          styles={{
            body: {
              padding: 8,
            },
          }}
        >
          <ChatMemberPage />
        </Card>
      </Col>
      <Col md={24} xl={18} xxl={17} sm={24}>
        <Card
          className="h-full"
          styles={{
            body: {
              height: "100%",
              padding: 8,
            },
          }}
        >
          <MessageLayout />
        </Card>
      </Col>
    </Row>
  );
}
