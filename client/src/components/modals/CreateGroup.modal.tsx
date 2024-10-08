/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Input, Modal, Upload } from "antd";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";

export default function CreateGroup() {
  const { isOpen, closeModal } = useModal("CreateGroup");
  const [imageUrl, setImageUrl] = useState("");
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleOk = () => {
    console.log({ groupName, file });
    closeModal();
  };

  const handleChange = (info: any) => {
    console.log(info.file);
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
