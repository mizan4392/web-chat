import { Input, Modal } from "antd";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";

export default function JoinGroupModal() {
  const { isOpen, closeModal } = useModal("JoinGroup");
  const [inviteCode, setInviteCode] = useState("");
  const handleOk = () => {};
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
