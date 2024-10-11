import { Dropdown, MenuProps, Modal, notification, Typography } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useModal } from "../hooks/useModal";
import { MemberRole } from "../store/types";
import { deleteGroup, getUserGroups } from "../http/group.http";
import { useGeneralStore } from "../store/general.store";

type GroupHeaderProps = {
  name?: string;
  role?: string;
};
export default function GroupHeader({ name, role }: GroupHeaderProps) {
  const [modal, contextHolder] = Modal.useModal();
  const { selectedGroup, setUserGroups } = useGeneralStore();
  const inviteModal = useModal("InviteToGroup");
  const updateModal = useModal("UpdateGroup");

  const confirm = () => {
    modal.confirm({
      title: "Do you want to delete this group?",
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      cancelText: "Close",
      onOk: () => {
        deleteGroup(Number(selectedGroup?.id))
          .then(() => {
            notification.success({
              message: "Group Deleted",
            });
            getUserGroups().then((data) => {
              setUserGroups(data);
            });
          })
          .catch((err) => {
            notification.error({
              message: "Error",
              description: err.message,
            });
          });
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Invite People",
      icon: <PlusCircleOutlined />,
      onClick: () => inviteModal.openModal(),
      disabled:
        role === MemberRole.ADMIN
          ? false
          : role === MemberRole.MODERATOR
          ? false
          : true,
    },

    {
      key: "2",
      label: "Update Group",
      icon: <SettingOutlined />,
      onClick: () => updateModal.openModal(),
      disabled:
        role === MemberRole.ADMIN
          ? false
          : role === MemberRole.MODERATOR
          ? false
          : true,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Delete Group",
      icon: <DeleteOutlined />,
      disabled: role === MemberRole.ADMIN ? false : true,
      onClick: confirm,
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
      {contextHolder}
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
