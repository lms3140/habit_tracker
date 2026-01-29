import { apiUrl } from "../../apis/env";

export const getHabitList = async () => {
  await fetch(`${apiUrl}/habit/list`, {
    headers: {},
  });
};
