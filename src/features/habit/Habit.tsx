import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthData, postAuthData } from "../../apis/fetch";
import { apiUrl } from "../../apis/env";
import type { HabitDay } from "./habitType";
import { Modal } from "../../components/modal/Modal";
import { useModal } from "../../hooks/useModal";
import { useAuthTokenStore } from "../../store/useAuthTokenStore";

export function Habit() {
  const { id } = useParams();
  const { token } = useAuthTokenStore();
  const [habitDayList, setHabitDayList] = useState<(HabitDay | null)[]>(
    new Array(30).fill(null),
  );
  const { isModalOpen, modalClose, modalOpen } = useModal();
  const { isSuccess, isError, error, data } = useQuery<HabitDay[]>({
    queryKey: ["habitDayList", id],
    queryFn: async () => {
      return await getAuthData({ url: `${apiUrl}/habit-day/${id}`, token });
    },
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (!isSuccess || !data) return;
    setHabitDayList(() => {
      const list = new Array(30).fill(null);
      data.forEach((day) => {
        list[day.habitIndex] = day;
      });
      return list;
    });
  }, [isSuccess]);

  if (isError) {
    return <div>404 띄우기</div>;
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
                  onClick={modalOpen}
                >
                  {i + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={modalClose}>
        <>모달~</>
      </Modal>
    </div>
  );
}
