import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../../../hooks/useAlert";
import { useAuthTokenStore } from "../../../store/useAuthTokenStore";
import { useModalStore } from "../../../store/useModalStore";
import { removeHabitDay } from "../HabitAPI";
import { useGetHabitList } from "../hook/useHabitList";
import { useHabitDayModalStore } from "../store/HabitDayStore";
import { HabitDayForm } from "./components/HabitDayForm";
import { HabitDayInfo } from "./components/HabitDayInfo";
import { Button } from "../../../components/button/Button";

export function HabitDayModal() {
  const { id } = useParams();
  const { habitIndex } = useHabitDayModalStore();
  const { token } = useAuthTokenStore();
  const { setForceEdit, forceEdit } = useModalStore();

  const { error, success } = useAlert();

  if (habitIndex === null || !id || !token) {
    return <div className="w-full"></div>;
  }

  const queryClient = useQueryClient();

  const removeHabitMutaion = useMutation({
    mutationFn: ({
      habitdayId,
      token,
    }: {
      habitdayId: number;
      token: string;
    }) => removeHabitDay(habitdayId, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habitDayList", id],
      });
      success("성공");
    },
    onError: () => {
      error("에러!");
    },
  });

  const { data: habitDays } = useGetHabitList({ id, token });

  const target = habitDays?.find((v) => v.habitIndex === habitIndex);

  //TODO - 삭제시 confirm 받기
  const handleDayRemoveBtn = async () => {
    if (!target || !token) return; // 예외처리가 필요합니다
    removeHabitMutaion.mutate({ habitdayId: target.habitDayId, token });
  };

  const editMode = forceEdit || !target;

  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        {editMode ? (
          <HabitDayForm habitId={id} />
        ) : (
          <HabitDayInfo habitDay={target} />
        )}
      </div>

      {editMode ? null : (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDayRemoveBtn}
            disabled={removeHabitMutaion.isPending}
          >
            삭제하기
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={() => {
              setForceEdit(true);
            }}
          >
            수정하기
          </Button>
        </div>
      )}
    </div>
  );
}
