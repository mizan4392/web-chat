import { API_URL, httpGet, httpPost } from "./http";

export type SendMessageType = {
  message: string;
  groupId: number;
};

export const sendMessage = async (data: SendMessageType) => {
  const response = await httpPost(`${API_URL}/group-message`, data);
  return response;
};

export type FetchGroupMessagesType = {
  groupId: number;
  page: number;
};

export const fetchGroupMessages = async (data: FetchGroupMessagesType) => {
  const response = await httpGet(
    `${API_URL}/group-message/fetch/${data.groupId}/${data.page}`
  );
  return response;
};