import { useForm } from "react-hook-form";
import { useAlert } from "../../../../hooks/useAlert";
import { useAuthTokenStore } from "../../../../store/useAuthTokenStore";
import { useModalStore } from "../../../../store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAuthData } from "../../../../apis/fetch";
import { apiUrl } from "../../../../apis/env";

type AddHabitForm = {
  habitTitle: string;
};
export function HabitAddForm() {
  const { token } = useAuthTokenStore();
  const { closeModal } = useModalStore();
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
    onSuccess: () => {
      success("성공!");

      queryClient.invalidateQueries({
        queryKey: ["habitList"],
      });
      closeModal();
    },
    onError: () => {
      error("실패");
    },
  });

  const onSubmitHabit = async (data: AddHabitForm) => {
    addHabitMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="
        bg-ds-surface
        border border-ds-border
        rounded-ds-lg
        shadow-ds
        px-6 py-7
      "
      >
        <h1 className="text-lg font-semibold text-ds-ink">습관 추가</h1>

        <form
          onSubmit={handleSubmit(onSubmitHabit)}
          className="mt-6 flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder="무엇을 꾸준히 해볼까요?"
            autoComplete="off"
            {...register("habitTitle", { required: true })}
            className="
            w-full
            bg-transparent
            border-b border-ds-border
            pb-3
            text-base text-ds-ink
            placeholder:text-ds-ink-muted
            outline-none
            focus:border-ds-primary
            transition-colors
          "
          />

          <button
            type="submit"
            className="
            self-end
            rounded-ds-pill
            bg-ds-primary
            px-5 py-2.5
            text-sm font-medium text-ds-ink
            hover:bg-ds-primary-hover
            transition
          "
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}
