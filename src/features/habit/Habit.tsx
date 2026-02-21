import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { apiUrl } from "../../apis/env";
import { getAuthData } from "../../apis/fetch";
import { Modal } from "../../components/modal/Modal";
import { useAuthTokenStore } from "../../store/useAuthTokenStore";
import { useModalStore } from "../../store/useModalStore";
import type { HabitDay } from "./habitType";
import { HabitDayModal } from "./modal/HabitDayModal";
import { useHabitDayModalStore } from "./store/HabitDayStore";
import type { HabitCardProps } from "./HabitCard";
import type { IHabitCard } from "../../types/globalType";

export function Habit() {
  const { id } = useParams();
  const { token } = useAuthTokenStore();
  const { setHabitIndex } = useHabitDayModalStore();
  const { isModalOpen, closeModal, openModal } = useModalStore();

  const { data } = useQuery<HabitDay[]>({
    queryKey: ["habitDayList", id],
    queryFn: async () => {
      return await getAuthData({ url: `${apiUrl}/habit-day/${id}`, token });
    },
    enabled: Boolean(id) && Boolean(token),
  });

  const { data: habitData } = useQuery<IHabitCard>({
    queryKey: ["habit", id],
    queryFn: async () =>
      getAuthData({ url: `${apiUrl}/habit/get-one?habitId=${id}`, token }),
    enabled: Boolean(id) && Boolean(token),
  });

  const days = useMemo(() => {
    const base = Array.from({ length: 30 }, () => null as HabitDay | null);
    (data ?? []).forEach((day) => {
      base[day.habitIndex] = day;
    });
    return base;
  }, [data]);

  const handleClickDay = (index: number) => {
    setHabitIndex(index);
    openModal();
  };

  return (
    <div className="h-dvh pt-10 bg-ds-bg">
      <div className="w-full max-w-4xl mx-auto">
        <div
          className="
          bg-ds-surface
          border border-ds-border
          rounded-ds-lg
          shadow-ds
          px-6 py-7
        "
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-ds-ink">
              {habitData?.habitTitle}
            </div>
            <div className="text-sm text-ds-ink-muted">30일</div>
          </div>

          {/* Grid */}
          <div className="mt-7 flex justify-center">
            <div className="grid grid-cols-5 gap-4">
              {days.map((habitDay, i) => {
                const isChecked = !!habitDay?.checked;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleClickDay(i)}
                    className={`
                    w-12 h-12
                    rounded-ds
                    text-sm font-medium
                    flex items-center justify-center
                    border
                    transition
                    active:scale-[0.98]
                    outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2
                    ${
                      isChecked
                        ? "bg-ds-primary border-transparent text-ds-ink hover:bg-ds-primary-hover"
                        : "bg-ds-bg border-ds-border text-ds-ink hover:bg-ds-accent"
                    }
                  `}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <HabitDayModal />
        </Modal>
      </div>
    </div>
  );
}
