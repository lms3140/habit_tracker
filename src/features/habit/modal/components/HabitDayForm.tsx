import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiUrl } from "../../../../apis/env";
import { postAuthData } from "../../../../apis/fetch";
import { useModal } from "../../../../hooks/useModal";
import { useAuthTokenStore } from "../../../../store/useAuthTokenStore";
import {
  useHabitDayIndexStore,
  useHabitDayListStore,
} from "../../store/HabitDayStore";
import { useHabitDayModalStore } from "../../store/HabitModalStore";
import { useParams } from "react-router-dom";

type HabitDayForm = {
  habitComment: string;
};

type FormProps = {
  habitId: string;
};
export function HabitDayForm({ habitId }: FormProps) {
  const { habitDayList, updateHabitDayAt } = useHabitDayListStore();
  const { habitIndex } = useHabitDayIndexStore();
  const { setForceEdit } = useHabitDayModalStore();
  const { modalClose } = useModal();
  const { register, handleSubmit } = useForm<HabitDayForm>();
  const { token } = useAuthTokenStore();
  const { id } = useParams();

  // TODO: 에러처리가 필요합니다. 지금은 단순 타입가드입니다.
  if (habitIndex === null) return <></>;

  const habitDay = habitDayList[habitIndex];
  const queryClient = useQueryClient();
  const saveHabitDayMutation = useMutation({
    mutationFn: (data: HabitDayForm) => {
      return postAuthData({
        url: `${apiUrl}/habit-day/save`,
        data: {
          habitId,
          checked: true,
          habitIndex: habitDay ? habitDay.habitIndex : habitIndex,
          habitComment: data.habitComment,
        },
        token: token,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habitDayList", id],
      });
    },

    onError: () => {
      console.error("등록 중 오류가 발생했습니다.");
    },

    onSettled: () => {
      setForceEdit(false);
      modalClose();
    },
  });

  const onSubmitHabitDay = async (data: HabitDayForm) => {
    if (habitIndex === null) return;
    saveHabitDayMutation.mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitHabitDay)}
      className="flex flex-col gap-4"
    >
      <textarea
        {...register("habitComment", { required: true })}
        placeholder="오늘의 기록을 남겨보세요"
        className="
        w-full min-h-30 resize-none
        rounded-xl border border-gray-300
        px-4 py-3 text-sm text-white-800
        placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
      "
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="
          px-5 py-2 rounded-xl text-sm font-medium
          bg-green-400 text-white
          hover:bg-green-500
          transition
        "
        >
          {habitDay ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
}
