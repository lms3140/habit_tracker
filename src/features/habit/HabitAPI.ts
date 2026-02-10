import { apiUrl } from "../../apis/env";
import { postAuthData } from "../../apis/fetch";

export const removeHabitDay = async (habitDayId: number, token: string) => {
  try {
    return await postAuthData({
      url: `${apiUrl}/habit-day/remove`,
      data: { habitDayId },
      token,
    });
  } catch (e) {
    console.log(e);
    return false;
  }
};
