import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../../../apis/env";
import { ApiError, getAuthData, postAuthData } from "../../../../apis/fetch";
import { useAuthTokenStore } from "../../../../store/useAuthTokenStore";
import { useModalStore } from "../../../../store/useModalStore";
import { useHabitDayModalStore } from "../../store/HabitDayStore";
import type {
  HabitCondition,
  HabitDay,
  HabitDifficulty,
  HabitPlace,
} from "../../habitType";
import { Button } from "../../../../components/button/Button";
import { SegmentedRadioGroup } from "../../../../components/input/Radio";
import { SelectField } from "../../../../components/input/Select";
import { habitQueryKeys, parseHabitId } from "../../habitQueryKeys";
import { useAlert } from "../../../../hooks/useAlert";

type HabitDayForm = {
  habitComment: string;
  habitDifficulty: HabitDifficulty;
  habitCondition: HabitCondition;
  habitPlace: HabitPlace;
  success: boolean;
};

type FormProps = {
  habitId: number;
};

const DIFFICULTY_OPTIONS = [
  { label: "쉬움", value: "EASY" },
  { label: "보통", value: "NORMAL" },
  { label: "어려움", value: "HARD" },
] as const;

const CONDITION_OPTIONS = [
  { label: "좋음", value: "GOOD" },
  { label: "보통", value: "NORMAL" },
  { label: "별로", value: "BAD" },
] as const;

const PLACE_OPTIONS = [
  { label: "집", value: "HOME" },
  { label: "회사/학교", value: "WORK" },
  { label: "밖", value: "OUT" },
  { label: "헬스장/특정", value: "GYM" },
  { label: "기타", value: "ETC" },
] as const;

const SUCCESS_OPTION = [
  { label: "성공", value: "SUCCESS" },
  { label: "실패", value: "FAILED" },
];

export function HabitDayForm({ habitId }: FormProps) {
  const { habitIndex } = useHabitDayModalStore();
  const { closeModal } = useModalStore();
  const { register, handleSubmit } = useForm<HabitDayForm>();
  const { token } = useAuthTokenStore();
  const { id } = useParams();
  const parsedHabitId = parseHabitId(id);
  const { success, error } = useAlert();

  const { data: habitDays } = useQuery<HabitDay[] | null>({
    queryKey: parsedHabitId
      ? habitQueryKeys.habitDayList(parsedHabitId)
      : habitQueryKeys.habitDayList(0),
    queryFn: () =>
      getAuthData<HabitDay[]>({ url: `${apiUrl}/habit-day/${id}`, token }),
    enabled: Boolean(parsedHabitId) && Boolean(token),
  });

  const habitDay = habitDays?.find((d) => d.habitIndex === habitIndex);

  const queryClient = useQueryClient();
  const saveHabitDayMutation = useMutation({
    mutationFn: (data: HabitDayForm) => {
      return postAuthData({
        url: `${apiUrl}/habit-day/save`,
        data: {
          habitId,
          success: true,
          habitIndex: habitDay ? habitDay.habitIndex : habitIndex,
          habitDayId: habitDay ? habitDay.habitDayId : null,
          habitComment: data.habitComment,
          habitPlace: data.habitPlace,
          habitDifficulty: data.habitDifficulty,
          habitCondition: data.habitCondition,
          completed: data.success,
        },
        token,
      });
    },

    onSuccess: () => {
      const hid = Number(id);
      if (Number.isInteger(hid) && hid > 0) {
        queryClient.invalidateQueries({ queryKey: ["habitDayList", hid] });
      }

      success(habitDay ? "수정했습니다." : "등록했습니다.");
      closeModal();
    },

    onError: (e) => {
      if (e instanceof ApiError) {
        if (e.code === "UNAUTHORIZED") return error("세션이 만료되었습니다.");
        if (e.status === 403) return error("권한이 없습니다.");
        if (e.status === 404) return error("대상이 존재하지 않습니다.");
      }
      error("저장에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  const onSubmitHabitDay = async (data: HabitDayForm) => {
    if (habitIndex === null) return;
    saveHabitDayMutation.mutate(data);
  };

  if (habitIndex === null) return <></>;

  return (
    <form
      onSubmit={handleSubmit(onSubmitHabitDay)}
      className="flex flex-col gap-5"
    >
      <SegmentedRadioGroup
        register={register}
        name={"success"}
        title="성공여부"
        options={SUCCESS_OPTION}
      />
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
      {saveHabitDayMutation.isPending ? (
        <div className="text-sm text-ds-ink-muted">저장 중...</div>
      ) : saveHabitDayMutation.isPaused ? (
        <div className="text-sm text-ds-ink-muted">
          오프라인 상태라 저장이 대기 중입니다. 연결되면 자동으로 재시도됩니다.
        </div>
      ) : null}
      <div className="flex justify-end">
        <Button
          disabled={saveHabitDayMutation.isPending}
          type="submit"
          variant="primary"
        >
          {habitDay ? "수정" : "등록"}
        </Button>
      </div>
    </form>
  );
}
