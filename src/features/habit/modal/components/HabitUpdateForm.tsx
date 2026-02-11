import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { postAuthData } from "../../../../apis/fetch";
import { apiUrl } from "../../../../apis/env";
import { useAuthTokenStore } from "../../../../store/useAuthTokenStore";
import { useModalStore } from "../../../../store/useModalStore";
import { useHabitModalStore } from "../../store/HabitModalStore";

type HabitUpdateForm = {
  habitTitle: string;
};

export function HabitUpdateForm() {
  const { register, handleSubmit } = useForm<HabitUpdateForm>();
  const { habitCard } = useHabitModalStore();
  const { token } = useAuthTokenStore();

  const queryClient = useQueryClient();
  const updateHabitMutation = useMutation({
    mutationFn: () => {
      return postAuthData({
        url: `${apiUrl}/habit/update`,
        data: {},
        token,
      });
    },
    onSuccess: () => {},
    onError: () => {},
  });

  const onSubmitHabitUpdate = (data: HabitUpdateForm) => {
    updateHabitMutation.mutate();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHabitUpdate)}>
        <input type="text" {...register("habitTitle", { required: true })} />
      </form>
    </div>
  );
}
