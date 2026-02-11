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
import { useHabitModalStore } from "../store/HabitModalStore";
import { HabitDayForm } from "./components/HabitDayForm";
import { HabitDayInfo } from "./components/HabitDayInfo";
import { useModalStore } from "../../../store/useModalStore";

export function HabitDayModal() {
  const { id } = useParams();
  const { habitIndex } = useHabitDayIndexStore();
  const { habitDayList } = useHabitDayListStore();
  const { token } = useAuthTokenStore();
  const { closeModal, setForceEdit, forceEdit } = useModalStore();

  const { error, success } = useAlert();

  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);

  if (habitIndex === null || !id) {
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
