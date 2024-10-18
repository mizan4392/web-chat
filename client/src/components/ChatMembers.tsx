import {
  Card,
  Col,
  Divider,
  Dropdown,
  MenuProps,
  notification,
  Row,
  Space,
  Typography,
} from "antd";
import { GroupMember } from "../store/types";
import {
  MoreOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useGeneralStore } from "../store/general.store";
import { updateGroupMemberRole } from "../http/group.http";

type ChatMembersProps = {
  members?: GroupMember[];
  role?: string;
  memberId?: number;
};
export default function ChatMembers({
  members,
  role,
  memberId,
}: ChatMembersProps) {
  return (
    <div>
      <Typography.Text className="ml-5">Members</Typography.Text>
      <Divider />
      <Row gutter={[5, 10]}>
        {members?.map((member) => (
          <Col key={member.id} className="w-full">
            <MemberCard
              key={member.id}
              member={member}
              role={role}
              memberId={memberId}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

const MemberCard = ({
  member,
  role = "",
  memberId,
}: {
  member: GroupMember;
  role?: string;
  memberId?: number;
}) => {
  const { user } = useGeneralStore();

  const handlePromotion = () => {
    updateGroupMemberRole(member.groupId, member.userId)
      .then(() => {
        notification.success({
          message: "User promoted to moderator",
        });
      })
      .catch((e) => {
        console.log(e);
        notification.error({
          message: "Failed to promote user",
        });
      });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Promote to moderator",
      onClick: handlePromotion,
      disabled: role !== "admin",
    },
    {
      key: "2",
      label: "Kick out",
    },
  ];

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
            <SafetyCertificateOutlined className="text-green-500" />
          ) : member.role === "moderator" ? (
            <SafetyCertificateOutlined className="text-gray-500" />
          ) : (
            <UserOutlined
              className={`${
                user?.id === member?.userId ? "text-green-500" : ""
              }`}
            />
          )}
          {role === "admin" || role === "moderator" ? (
            member.role === "admin" ? (
              <div></div>
            ) : memberId === member.id ? (
              <div></div>
            ) : (
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <MoreOutlined className="cursor-pointer" />
                  </Space>
                </a>
              </Dropdown>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Card>
  );
};
