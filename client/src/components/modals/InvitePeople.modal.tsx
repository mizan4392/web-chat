/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Modal, notification } from "antd";
import { useModal } from "../../hooks/useModal";
import { useGeneralStore } from "../../store/general.store";
import { useEffect, useState } from "react";
import { generateNewGroupKey } from "../../http/group.http";

export default function InvitePeopleModal() {
  const [inviteCode, setInviteCode] = useState("");
  const inviteModal = useModal("InviteToGroup");
  const { selectedGroup, setSelectedGroup } = useGeneralStore();
  useEffect(() => {
    if (selectedGroup) {
      setInviteCode(selectedGroup?.inviteCode || "");
    }
  }, [selectedGroup]);

  const handleOnClick = (e: any) => {
    e.preventDefault();
    if (!selectedGroup?.id) {
      return;
    }
    generateNewGroupKey(selectedGroup?.id)
      .then((data) => {
        setSelectedGroup(data);
        notification.success({
          message: "Invite code has been updated successfully",
          description: "Share the invite code with your friends",
        });
      })
      .catch((error) => {
        notification.error({
          message: "Failed to generate key",
          description: error.message,
        });
      });
  };
  const onClosed = () => {
    setInviteCode("");

    inviteModal.closeModal();
  };
  return (
    <Modal
      title="Invite People"
      open={inviteModal.isOpen}
      onCancel={onClosed}
      okText="Generate new Key"
      onOk={handleOnClick}
      cancelText="Close"
    >
      <Input
        placeholder="Invite Code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />
    </Modal>
  );
}
