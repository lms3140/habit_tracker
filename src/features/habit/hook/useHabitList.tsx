import { useQuery } from "@tanstack/react-query";
import type { HabitDay } from "../habitType";
import { apiUrl } from "../../../apis/env";
import { getAuthData } from "../../../apis/fetch";

type GetHabitListParams = {
  id: string;
  token: string;
};
export const useGetHabitList = ({ id, token }: GetHabitListParams) => {
  return useQuery<HabitDay[]>({
    queryKey: ["habitDayList", id],
    queryFn: () => getAuthData({ url: `${apiUrl}/habit-day/${id}`, token }),
    enabled: Boolean(id) && Boolean(token),
  });
};
