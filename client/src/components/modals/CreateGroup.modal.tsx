/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Input, Modal, notification, Upload } from "antd";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { createGroup, getUserGroups } from "../../http/group.http";
import { useGeneralStore } from "../../store/general.store";

export default function CreateGroup() {
  const { isOpen, closeModal } = useModal("CreateGroup");
  const [imageUrl, setImageUrl] = useState("");
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUserGroups } = useGeneralStore();

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
    formData.append("file", file as Blob);
    try {
      await createGroup(formData);
      notification.success({
        message: "Group has been created successfully",
      });
      clearState();
      closeModal();
      getUserGroups().then((data) => {
        setUserGroups(data);
      });
    } catch (error: any) {
      notification.error({
        message: "Failed to create group",
        description: error.message,
      });
    }
    setLoading(false);
  };

  const handleChange = (info: any) => {
    const imageUri = URL.createObjectURL(info.file.originFileObj);
    setFile(info.file.originFileObj);
    setImageUrl(imageUri);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <div style={{ marginTop: 8 }}>Upload an Image</div>
    </button>
  );

  return (
    <Modal
      title="Create Group"
      open={isOpen}
      onOk={handleOk}
      onCancel={closeModal}
      okText="Create"
      okButtonProps={{ loading }}
      cancelButtonProps={{ disabled: loading }}
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
