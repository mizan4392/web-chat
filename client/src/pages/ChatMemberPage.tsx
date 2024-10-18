/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import GroupHeader from "../components/GroupHeader";
import { GroupMember } from "../store/types";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupDetails } from "../http/group.http";
import { Divider, notification } from "antd";
import ChatMembers from "../components/ChatMembers";
import { useGeneralStore } from "../store/general.store";

export default function ChatMemberPage() {
  const { groupId } = useParams();
  const [currentMember, setCurrentMember] = useState<GroupMember>();
  const { user, selectedGroup, setSelectedGroup } = useGeneralStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedGroup && user) {
      const member = selectedGroup?.members?.find(
        (member) => member.userId === user.id
      );
      setCurrentMember(member);
    }
  }, [selectedGroup, user]);
  useEffect(() => {
    if (groupId?.trim()) {
      getGroupDetails(groupId)
        .then((data) => {
          setSelectedGroup(data);
        })
        .catch((e: any) => {
          notification.error({
            message: e?.message,
          });
          navigate("/");
        });
    }
  }, [groupId]);

  return (
    <div className="">
      <GroupHeader name={selectedGroup?.name} role={currentMember?.role} />
      <Divider />
      <ChatMembers
        members={selectedGroup?.members}
        role={currentMember?.role}
        memberId={currentMember?.id}
      />
    </div>
  );
}
