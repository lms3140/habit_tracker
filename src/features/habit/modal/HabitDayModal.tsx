import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../../../hooks/useAlert";
import { useAuthTokenStore } from "../../../store/useAuthTokenStore";
import { removeHabitDay } from "../HabitAPI";
import {
  useHabitDayIndexStore,
  useHabitDayListStore,
} from "../store/HabitDayStore";
import { useHabitDayModalStore } from "../store/HabitModalStore";
import { HabitDayForm } from "./components/HabitDayForm";
import { HabitDayInfo } from "./components/HabitDayInfo";

export function HabitDayModal({ onClose }: { onClose: () => void }) {
  const { id } = useParams();
  const { setForceEdit, forceEdit } = useHabitDayModalStore();
  const { habitIndex } = useHabitDayIndexStore();
  const { habitDayList } = useHabitDayListStore();
  const { token } = useAuthTokenStore();

  const { error, success } = useAlert();

  useEffect(() => {
    if (!id || habitIndex === null) {
      onClose();
      return;
    }
  }, [id, habitIndex]);

  if (habitIndex === null || !id) {
    console.log(habitIndex);
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

  const target = habitDayList[habitIndex];
  //TODO - 삭제시 confirm 받기
  const handleDayRemoveBtn = async () => {
    if (!target || !token) return; // 예외처리가 필요합니다
    removeHabitMutaion.mutate({ habitdayId: target.habitDayId, token });
  };

  const editMode = forceEdit || !habitDayList[habitIndex];

  return (
    <div className="w-full">
      <div>{editMode ? <HabitDayForm habitId={id} /> : <HabitDayInfo />}</div>
      {editMode ? null : (
        <div>
          <button onClick={handleDayRemoveBtn}>삭제하기</button>
          <button
            onClick={() => {
              setForceEdit(true);
            }}
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}
