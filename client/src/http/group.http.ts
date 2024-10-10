import { API_URL, httpGet, httpPostFile } from "./http";

export const createGroup = async (data: FormData) => {
  const response = await httpPostFile(`${API_URL}/group/create`, data);
  return response;
};

export const getUserGroups = async () => {
  const response = await httpGet(`${API_URL}/group/user-groups`);
  return response;
};
