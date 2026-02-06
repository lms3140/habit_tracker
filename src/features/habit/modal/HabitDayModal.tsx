import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../../hooks/useModal";
import { HabitDayForm } from "./components/HabitDayForm";
import { HabitDayInfo } from "./components/HabitDayInfo";
import {
  useHabitDayIndexStore,
  useHabitDayListStore,
} from "../store/HabitDayStore";
import { useHabitDayModalStore } from "../store/HabitModalStore";

export function HabitDayModal() {
  const { id } = useParams();
  const { modalClose } = useModal();
  const { setForceEdit, forceEdit } = useHabitDayModalStore();
  const { habitIndex } = useHabitDayIndexStore();
  const { habitDayList } = useHabitDayListStore();
  console.log(habitDayList);
  useEffect(() => {
    if (!id || habitIndex === null) {
      modalClose();
    }
  }, [id, habitIndex]);

  if (habitIndex === null) {
    return <></>;
  }

  if (!id) {
    return <div className="w-full"></div>;
  }

  const editMode = forceEdit || !habitDayList[habitIndex];

  return (
    <div className="w-full">
      <div>{editMode ? <HabitDayForm habitId={id} /> : <HabitDayInfo />}</div>
      {editMode ? null : (
        <div>
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
