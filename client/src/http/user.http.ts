import { API_URL, getSessionToken, httpPost } from "./http";

export const createUser = async () => {
  console.log("Token->", getSessionToken());
  const response = await httpPost(
    `${API_URL}/user`,
    {},
    {
      Authorization: `Bearer ${getSessionToken()}`,
    }
  );
  return response;
};
