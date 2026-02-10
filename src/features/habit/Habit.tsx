import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { apiUrl } from "../../apis/env";
import { getAuthData } from "../../apis/fetch";
import { Modal } from "../../components/modal/Modal";
import { useModal } from "../../hooks/useModal";
import { useAuthTokenStore } from "../../store/useAuthTokenStore";
import type { HabitDay } from "./habitType";
import { HabitDayModal } from "./modal/HabitDayModal";
import {
  useHabitDayIndexStore,
  useHabitDayListStore,
} from "./store/HabitDayStore";

export function Habit() {
  const { id } = useParams();
  const { token } = useAuthTokenStore();
  const { habitDayList, updateHabitDayAt, resetHabitDayList } =
    useHabitDayListStore();
  const { setHabitIndex } = useHabitDayIndexStore();
  const { isModalOpen, modalClose, modalOpen } = useModal();
  const { isSuccess, isError, data } = useQuery<HabitDay[]>({
    queryKey: ["habitDayList", id],
    queryFn: async () => {
      return await getAuthData({ url: `${apiUrl}/habit-day/${id}`, token });
    },
    enabled: Boolean(id) && Boolean(token),
  });
  useEffect(() => {
    if (!isSuccess || !data) return;
    data.forEach((day) => {
      updateHabitDayAt(day.habitIndex, day);
    });
    return () => resetHabitDayList();
  }, [isSuccess, data, updateHabitDayAt]);

  const handleClickDay = (index: number) => {
    setHabitIndex(index);
    modalOpen();
  };

  if (isError) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold text-gray-800">{"Habit"}</div>
          <div className="text-sm text-gray-500">30일</div>
        </div>
        <div className="w-xl flex items-center justify-center mx-auto">
          <div className="grid grid-cols-5 gap-4">
            {habitDayList.map((habitDay, i) => (
              <div className="w-full flex justify-center" key={i}>
                <button
                  className={`
              w-12 h-12 rounded-xl text-sm font-medium transition
              flex items-center justify-center 
              ${
                habitDay?.checked
                  ? "bg-green-400 text-white hover:bg-green-500"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
                  onClick={() => {
                    handleClickDay(i);
                  }}
                >
                  {i + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={modalClose}>
        <HabitDayModal onClose={modalClose} />
      </Modal>
    </div>
  );
}
