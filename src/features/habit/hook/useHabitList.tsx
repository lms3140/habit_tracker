import { useQuery } from "@tanstack/react-query";
import type { HabitDay } from "../habitType";
import { apiUrl } from "../../../apis/env";
import { getAuthData } from "../../../apis/fetch";
import { habitQueryKeys, parseHabitId } from "../habitQueryKeys";

type GetHabitListParams = {
  id: number | null;
  token: string | null;
};
export const useGetHabitList = ({ id, token }: GetHabitListParams) => {
  const habitId = parseHabitId(id);

  return useQuery<HabitDay[] | null>({
    queryKey: habitQueryKeys.habitDayList(habitId ?? 0),
    queryFn: () =>
      getAuthData<HabitDay[]>({ url: `${apiUrl}/habit-day/${habitId}`, token }),
    enabled: Boolean(habitId) && Boolean(token),
  });
};
