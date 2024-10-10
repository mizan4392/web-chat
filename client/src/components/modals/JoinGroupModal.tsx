import { Input, Modal, notification } from "antd";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { getUserGroups, joinGroup } from "../../http/group.http";
import { useGeneralStore } from "../../store/general.store";

export default function JoinGroupModal() {
  const { isOpen, closeModal } = useModal("JoinGroup");
  const [inviteCode, setInviteCode] = useState("");

  const { setUserGroups } = useGeneralStore();

  const handleOk = () => {
    if (inviteCode.trim() !== "") {
      joinGroup(inviteCode)
        .then(() => {
          notification.success({
            message: "joined successfully",
          });
          getUserGroups().then((data) => {
            setUserGroups(data);
          });
          closeModal();
          setInviteCode("");
        })
        .catch((error) => {
          console.log(error);
          setInviteCode("");
          notification.error({
            message: "Failed to join group",
            description: error.message,
          });
        });
    }
  };
  return (
    <Modal
      title="Join Group"
      open={isOpen}
      onOk={handleOk}
      onCancel={closeModal}
      okText="Join"
    >
      <Input
        placeholder="Invite Code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />
    </Modal>
  );
}
