import { API_URL, httpPost } from "./http";

export const createUser = async () => {
  const response = await httpPost(`${API_URL}/user`, {});
  return response;
};
