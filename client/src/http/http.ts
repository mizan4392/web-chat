/* eslint-disable @typescript-eslint/no-explicit-any */
export const API_URL = import.meta.env.VITE_API_URL as string;
export const getCookies = (name: string) => {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const getSessionToken = () => {
  return getCookies("__session");
};
export async function httpGet(
  url: string,
  headers: HeadersInit = {}
): Promise<any> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return handleResponse(response);
}

export async function httpPost(
  url: string,
  body: any,
  headers: HeadersInit = {}
): Promise<any> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

export async function httpPostFile(
  url: string,
  file: File,
  headers: HeadersInit = {}
): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: formData,
  });
  return handleResponse(response);
}

export async function httpUpdate(
  url: string,
  body: any,
  headers: HeadersInit = {}
): Promise<any> {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

async function handleResponse(response: Response): Promise<any> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
}
