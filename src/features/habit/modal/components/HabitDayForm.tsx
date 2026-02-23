import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../../../apis/env";
import { getAuthData, postAuthData } from "../../../../apis/fetch";
import { useAuthTokenStore } from "../../../../store/useAuthTokenStore";
import { useModalStore } from "../../../../store/useModalStore";
import { useHabitDayModalStore } from "../../store/HabitDayStore";
import type { HabitDay } from "../../habitType";
import { Button } from "../../../../components/button/Button";
import { SegmentedRadioGroup } from "../../../../components/input/Radio";
import { SelectField } from "../../../../components/input/Select";

type HabitDayForm = {
  habitComment: string;
  habitDifficulty: string;
  habitCondition: string;
  habitPlace: string;
};

type FormProps = {
  habitId: string;
};

const DIFFICULTY_OPTIONS = [
  { label: "쉬움", value: "EASY" },
  { label: "보통", value: "NORMAL" },
  { label: "어려움", value: "HARD" },
] as const;

const CONDITION_OPTIONS = [
  { label: "좋음", value: "GOOD" },
  { label: "보통", value: "OK" },
  { label: "별로", value: "BAD" },
] as const;

const PLACE_OPTIONS = [
  { label: "집", value: "HOME" },
  { label: "회사/학교", value: "WORK" },
  { label: "밖", value: "OUT" },
  { label: "헬스장/특정", value: "GYM" },
  { label: "기타", value: "ETC" },
] as const;

export function HabitDayForm({ habitId }: FormProps) {
  const { habitIndex } = useHabitDayModalStore();
  const { closeModal, setForceEdit } = useModalStore();
  const { register, handleSubmit } = useForm<HabitDayForm>();
  const { token } = useAuthTokenStore();
  const { id } = useParams();

  // TODO: 에러처리가 필요합니다. 지금은 단순 타입가드입니다.
  if (habitIndex === null) return <></>;

  const { data: habitDays } = useQuery<HabitDay[]>({
    queryKey: ["habitDayList", id],
    queryFn: () => getAuthData({ url: `${apiUrl}/habit-day/${id}`, token }),
    enabled: Boolean(id) && Boolean(token),
  });

  const habitDay = habitDays?.find((d) => d.habitIndex === habitIndex);

  const queryClient = useQueryClient();
  const saveHabitDayMutation = useMutation({
    mutationFn: (data: HabitDayForm) => {
      return postAuthData({
        url: `${apiUrl}/habit-day/update`,
        data: {
          habitId,
          checked: true,
          habitIndex: habitDay ? habitDay.habitIndex : habitIndex,
          habitDayId: habitDay ? habitDay.habitDayId : null,
          habitComment: data.habitComment,
          habitPlace: data.habitPlace,
          habitDifficulty: data.habitDifficulty,
          habitCondition: data.habitCondition,
        },
        token,
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
      closeModal();
    },
  });

  const onSubmitHabitDay = async (data: HabitDayForm) => {
    if (habitIndex === null) return;
    saveHabitDayMutation.mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitHabitDay)}
      className="flex flex-col gap-5"
    >
      <SegmentedRadioGroup
        register={register}
        name={"habitDifficulty"}
        options={DIFFICULTY_OPTIONS}
        title="난이도"
        required={true}
      />
      <SegmentedRadioGroup
        register={register}
        name={"habitCondition"}
        options={CONDITION_OPTIONS}
        title="컨디션"
        required={true}
      />
      <SelectField
        register={register}
        name={"habitPlace"}
        options={PLACE_OPTIONS}
        title="장소"
        required={true}
      />

      <label>메모</label>
      <textarea
        {...register("habitComment", { required: true })}
        placeholder="오늘의 기록을 남겨보세요"
        className="
        w-full min-h-32 resize-none
        border border-ds-border
        bg-ds-surface
        rounded-ds
        px-4 py-3 text-sm text-ds-ink
        placeholder:text-ds-ink-muted
        outline-none
        focus-visible:ring-2 focus-visible:ring-ds-ring
        focus-visible:ring-offset-2 focus-visible:ring-offset-ds-surface
        transition
      "
      />

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          {habitDay ? "수정" : "등록"}
        </Button>
      </div>
    </form>
  );
}
