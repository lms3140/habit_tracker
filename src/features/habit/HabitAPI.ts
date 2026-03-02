import { apiUrl } from "../../apis/env";
import { postAuthData } from "../../apis/fetch";

export const removeHabitDay = async (habitDayId: number, token: string) => {
  return await postAuthData({
    url: `${apiUrl}/habit-day/remove`,
    data: { habitDayId },
    token,
  });
};
