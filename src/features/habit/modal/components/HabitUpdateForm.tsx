import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiUrl } from "../../../../apis/env";
import { postAuthData } from "../../../../apis/fetch";
import { useAuthTokenStore } from "../../../../store/useAuthTokenStore";
import { useModalStore } from "../../../../store/useModalStore";
import { useHabitModalStore } from "../../store/HabitModalStore";

type HabitUpdateForm = {
  habitTitle: string;
};

export function HabitUpdateForm() {
  const { habitCard } = useHabitModalStore();
  const { register, handleSubmit } = useForm<HabitUpdateForm>({
    defaultValues: { habitTitle: habitCard?.habitTitle },
  });
  const { token } = useAuthTokenStore();
  const { closeModal, resetForceEdit } = useModalStore();

  if (!habitCard) {
    return <div className="w-full">{/* 오류페이지 안내 */}</div>;
  }

  const queryClient = useQueryClient();
  const updateHabitMutation = useMutation({
    mutationFn: (habitTitle: string) => {
      return postAuthData({
        url: `${apiUrl}/habit/update`,
        data: { habitId: habitCard?.habitId, habitTitle },
        token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habitList"],
      });
      closeModal();
      resetForceEdit();
    },
    onError: () => {},
  });

  const onSubmitHabitUpdate = (data: HabitUpdateForm) => {
    updateHabitMutation.mutate(data.habitTitle);
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
        <h1 className="text-lg font-semibold text-ds-ink">습관 수정</h1>

        <form
          onSubmit={handleSubmit(onSubmitHabitUpdate)}
          className="mt-6 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-ds-ink-muted">수정할 내용</label>

            <input
              type="text"
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
          </div>

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
            수정
          </button>
        </form>
      </div>
    </div>
  );
}
