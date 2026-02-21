import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./apis/env";
import { getAuthData } from "./apis/fetch";
import { Container } from "./components/container/Container";
import { Modal } from "./components/modal/Modal";
import { EmptyHabitCard } from "./features/habit/EmtpyHabitCard";
import { HabitCard } from "./features/habit/HabitCard";
import { HabitCardSkeleton } from "./features/habit/HabitCardSkeleton";
import { HabitModal } from "./features/habit/modal/HabitModal";
import { useAuthTokenStore } from "./store/useAuthTokenStore";
import { useModalStore } from "./store/useModalStore";
import type { IHabitCard } from "./types/globalType";

//TODO - 값이 없을시 처리
function Home() {
  const navigate = useNavigate();
  const { token } = useAuthTokenStore();

  const { isModalOpen, closeModal, openModal } = useModalStore();

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
    <div className="bg-ds-bg h-lvh">
      <Container>
        <h1 className="text-center text-3xl py-8">Habit Tracker</h1>

        {isLoading ? (
          <HabitCardSkeleton />
        ) : (
          <div className="grid grid-cols-3">
            {data?.map((v) => (
              <HabitCard habitCardObj={v} key={v.habitId} />
            ))}
            <EmptyHabitCard
              onClick={() => {
                openModal();
              }}
            />
          </div>
        )}

        {/* 모달버튼 부분 */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <HabitModal />
        </Modal>
      </Container>
    </div>
  );
}

export default Home;
