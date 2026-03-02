import { apiUrl } from "../../../apis/env";
import { getAuthData } from "../../../apis/fetch";

export type MeResponse = {
  id: number;
  userId: string;
  nickname: string;
  role: string;
  status: string;
};

export function getMe(token: string) {
  return getAuthData<MeResponse>({
    url: `${apiUrl}/user/me`,
    token,
  });
}
