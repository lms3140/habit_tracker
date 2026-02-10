import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiUrl } from "../../../apis/env";
import { postAuthData } from "../../../apis/fetch";
import { useAlert } from "../../../hooks/useAlert";
import { useAuthTokenStore } from "../../../store/useAuthTokenStore";

type AddHabitForm = {
  habitTitle: string;
};

export function HabitModal({ onClose }: { onClose: () => void }) {
  const { token } = useAuthTokenStore();
  const { success, error } = useAlert();
  const { register, handleSubmit } = useForm<AddHabitForm>();

  const queryClient = useQueryClient();

  const addHabitMutation = useMutation({
    mutationFn: (data: AddHabitForm) =>
      postAuthData({
        url: `${apiUrl}/habit/add`,
        data,
        token,
      }),
    onSuccess: (result) => {
      success("성공!" + result.habitId);

      queryClient.invalidateQueries({
        queryKey: ["habitList"],
      });
      onClose();
    },
    onError: () => {
      error("실패");
    },
  });

  const onSubmitHabit = async (data: AddHabitForm) => {
    addHabitMutation.mutate(data);
  };

  return (
    <div className="w-full">
      <h1>습관 추가하기!</h1>
      <form onSubmit={handleSubmit(onSubmitHabit)}>
        <input type="text" {...register("habitTitle", { required: true })} />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
