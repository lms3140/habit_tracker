import { useQuery } from "@tanstack/react-query";
import type { HabitDay } from "../habitType";
import { apiUrl } from "../../../apis/env";
import { getAuthData } from "../../../apis/fetch";
import { habitQueryKeys, parseHabitId } from "../habitQueryKeys";

type GetHabitListParams = {
  id: string;
  token: string;
};
export const useGetHabitList = ({ id, token }: GetHabitListParams) => {
  const habitId = parseHabitId(id);

  return useQuery<HabitDay[] | null>({
    queryKey: habitId
      ? habitQueryKeys.habitDayList(habitId)
      : habitQueryKeys.habitDayList(0),
    queryFn: () =>
      getAuthData<HabitDay[]>({ url: `${apiUrl}/habit-day/${id}`, token }),
    enabled: Boolean(habitId) && Boolean(token),
  });
};
