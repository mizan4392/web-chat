import { Dropdown, MenuProps, Typography } from "antd";
import {
  DeleteOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useModal } from "../hooks/useModal";

type GroupHeaderProps = {
  name?: string;
  role?: string;
};
export default function GroupHeader({ name, role }: GroupHeaderProps) {
  const inviteModal = useModal("InviteToGroup");
  const updateModal = useModal("UpdateGroup");
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Invite People",
      icon: <PlusCircleOutlined />,
      onClick: () => inviteModal.openModal(),
    },

    {
      key: "2",
      label: "Update Group",
      icon: <SettingOutlined />,
      onClick: () => updateModal.openModal(),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Delete Group",
      icon: <DeleteOutlined />,
    },
    {
      key: "4",
      label: "Leave Group",
      icon: <PoweroffOutlined />,
      disabled: role === "admin" ? true : false,
    },
  ];
  return (
    <div className="flex justify-between w-full">
      <div className="ml-5">
        <Typography.Title level={3}>{name}</Typography.Title>
      </div>
      <div>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <MoreOutlined className=" cursor-pointer" />
          </a>
        </Dropdown>
      </div>
    </div>
  );
}