type GetDataParams = {
  url: string;
  token?: string | null;
};
type OnlyUrl = Pick<GetDataParams, "url">;

export const getData = async ({ url }: OnlyUrl) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const getAuthData = async ({ url, token }: GetDataParams) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }
  return response.json();
};

type PostDataParams = {
  url: string;
  data: Record<string, any>;
  token?: string | null;
};

type WithOutTokenParams = Omit<PostDataParams, "token">;

export const postData = async ({ url, data }: WithOutTokenParams) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const postAuthData = async ({ url, data, token }: PostDataParams) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }
  return response.json();
};
