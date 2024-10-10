import { Card, Col, Divider, Row, Typography } from "antd";
import { GroupMember } from "../store/types";
import {
  MoreOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";

type ChatMembersProps = {
  members?: GroupMember[];
};
export default function ChatMembers({ members }: ChatMembersProps) {
  return (
    <div>
      <Typography.Text className="ml-5">Members</Typography.Text>
      <Divider />
      <Row gutter={5}>
        {members?.map((member) => (
          <Col key={member.id} className="w-full">
            <MemberCard key={member.id} member={member} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

const MemberCard = ({ member }: { member: GroupMember }) => {
  return (
    <Card
      className="w-full"
      styles={{
        body: {
          padding: 10,
        },
      }}
    >
      <div className="flex justify-between">
        <Typography.Text>{member.user.name}</Typography.Text>
        <div className="flex gap-4">
          {member.role === "admin" ? (
            <SafetyCertificateOutlined className="text-green-400" />
          ) : (
            <UserOutlined />
          )}
          {member.role !== "admin" && (
            <MoreOutlined className="cursor-pointer" />
          )}
        </div>
      </div>
    </Card>
  );
};
