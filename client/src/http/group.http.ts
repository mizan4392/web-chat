import {
  API_URL,
  httpDelete,
  httpGet,
  httpPost,
  httpPostFile,
  httpUpdate,
} from "./http";

export const createGroup = async (data: FormData) => {
  const response = await httpPostFile(`${API_URL}/group/create`, data);
  return response;
};

export const getUserGroups = async () => {
  const response = await httpGet(`${API_URL}/group/user-groups`);
  return response;
};

export const getGroupDetails = async (groupId: string) => {
  const response = await httpGet(`${API_URL}/group/${groupId}`);
  return response;
};

export const generateNewGroupKey = async (groupId: number) => {
  const response = await httpUpdate(`${API_URL}/group/generate-key`, {
    groupId: groupId,
  });
  return response;
};

export const joinGroup = async (inviteCode: string) => {
  const response = await httpPost(`${API_URL}/group/join`, {
    inviteCode,
  });
  return response;
};

export const updateGroup = async (data: FormData) => {
  const response = await httpPostFile(`${API_URL}/group/update`, data);
  return response;
};

export const deleteGroup = async (groupId: number) => {
  const response = await httpDelete(`${API_URL}/group/${groupId}`);
  return response;
};

export const updateGroupMemberRole = async (
  groupId: number,
  userId: number
) => {
  const response = await httpPost(`${API_URL}/group-members/promotion`, {
    groupId,
    userId,
  });
  return response;
};
