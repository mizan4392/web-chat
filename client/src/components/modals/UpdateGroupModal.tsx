/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Input, Modal, notification, Upload } from "antd";
import { useModal } from "../../hooks/useModal";
import { useGeneralStore } from "../../store/general.store";
import { useEffect, useState } from "react";
import { updateGroup } from "../../http/group.http";

export default function UpdateGroupModal() {
  const [imageUrl, setImageUrl] = useState("");
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { isOpen, closeModal } = useModal("UpdateGroup");
  const [loading, setLoading] = useState(false);
  const { selectedGroup, setSelectedGroup } = useGeneralStore();

  useEffect(() => {
    if (selectedGroup) {
      setImageUrl(selectedGroup.imageUrl || "");
      setGroupName(selectedGroup.name);
    }
  }, [selectedGroup]);

  const handleChange = (info: any) => {
    const imageUri = URL.createObjectURL(info.file.originFileObj);
    setFile(info.file.originFileObj);
    setImageUrl(imageUri);
  };
  const clearState = () => {
    setImageUrl("");
    setGroupName("");
    setFile(null);
    setLoading(false);
  };
  const handleOk = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", groupName);
    formData.append("groupId", selectedGroup?.id?.toString() || "");
    if (file) {
      formData.append("file", file as Blob);
    }

    try {
      await updateGroup(formData).then((data) => {
        setSelectedGroup(data);
        notification.success({
          message: "Group has been updated successfully",
        });
        clearState();
        closeModal();
      });
    } catch (error: any) {
      notification.error({
        message: "Failed to create group",
        description: error.message,
      });
    }
    setLoading(false);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <div style={{ marginTop: 8 }}>Upload an Image</div>
    </button>
  );

  return (
    <Modal
      title="Update Group"
      open={isOpen}
      onClose={closeModal}
      onOk={handleOk}
      okButtonProps={{
        loading: loading,
      }}
    >
      <Flex vertical={true} gap={"middle"}>
        <Input
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          status={!groupName.trim() ? "error" : undefined}
        />
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange}
          style={{ position: "relative" }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              style={{ width: "90%", height: "90%" }}
              className=" rounded-full"
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Flex>
    </Modal>
  );
}
