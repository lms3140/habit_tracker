import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiUrl } from "./apis/env";
import { getAuthData, getData } from "./apis/fetch";
import { HabitCard } from "./components/HabitCard/HabitCard";
import { Modal } from "./components/modal/Modal";
import { HabitCardSkeleton } from "./features/habit/HabitCardSkeleton";
import type { IHabitCard } from "./types/globalType";
import { useNavigate } from "react-router-dom";
import { useAuthTokenStore } from "./store/useAuthTokenStore";
import { useModal } from "./hooks/useModal";
import { HabitModal } from "./features/habit/modal/HabitModal";

//TODO - 값이 없을시 처리
function Home() {
  const navigate = useNavigate();
  const { token } = useAuthTokenStore();
  const { isModalOpen, modalClose, modalOpen } = useModal();

  const { isLoading, isError, error, data } = useQuery<IHabitCard[]>({
    queryKey: ["habitList"],
    queryFn: async () => {
      return await getAuthData({
        url: `${apiUrl}/habit/list`,
        token,
      });
    },
    enabled: Boolean(token),
  });

  useEffect(() => {
    if (isError) {
      if (error.message === "UNAUTHORIZED") {
        navigate("/login", { replace: true });
      }
    }
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [isError, error?.message]);

  return (
    <div className="bg-yellow-50">
      <div className="container h-dvh mx-auto">
        <h1 className="text-center text-3xl py-8">Habit Tracker</h1>
        <div
          onClick={() => {
            modalOpen();
            console.log("h");
          }}
        >
          추가~
        </div>
        {isLoading ? (
          <HabitCardSkeleton />
        ) : (
          <div>
            {data?.map((v) => (
              <HabitCard habitCardObj={v} key={v.habitId} />
            ))}
          </div>
        )}

        {/* 모달버튼 부분 */}
        <Modal isOpen={isModalOpen} onClose={modalClose}>
          <HabitModal onClose={modalClose} />
        </Modal>
      </div>
    </div>
  );
}

export default Home;
