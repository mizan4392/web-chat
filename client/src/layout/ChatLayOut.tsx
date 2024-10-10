import { Card, Col, Row } from "antd";
import ChatMemberPage from "../pages/ChatMemberPage";

export default function ChatLayOut() {
  return (
    <Row gutter={14} className="h-full">
      <Col md={6} xl={6} xxl={7} className="h-full">
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
      <Col md={18} xl={18} xxl={17}>
        <Card className="h-full"></Card>
      </Col>
    </Row>
  );
}
