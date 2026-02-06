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

function Home() {
  const navigate = useNavigate();
  const { token } = useAuthTokenStore();
  const [isModalOpen, setModalOpen] = useState(false);

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
        <div>
          <button onClick={() => setModalOpen((prev) => !prev)}>하이</button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <div>테스트</div>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
