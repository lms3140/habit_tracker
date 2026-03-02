import { useQuery } from "@tanstack/react-query";
import type { HabitDay } from "../habitType";
import { apiUrl } from "../../../apis/env";
import { getAuthData } from "../../../apis/fetch";

type GetHabitListParams = {
  id: string;
  token: string;
};
export const useGetHabitList = ({ id, token }: GetHabitListParams) => {
  return useQuery<HabitDay[] | null>({
    queryKey: ["habitDayList", id],
    // getAuthData<T> now returns Promise<T | null>, so the query result type
    // must allow null.  callers already guard with optional chaining.
    queryFn: () =>
      getAuthData<HabitDay[]>({ url: `${apiUrl}/habit-day/${id}`, token }),
    enabled: Boolean(id) && Boolean(token),
  });
};
