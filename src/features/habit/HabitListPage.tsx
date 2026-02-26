import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthTokenStore } from "../../store/useAuthTokenStore";
import { useModalStore } from "../../store/useModalStore";
import type { IHabitCard } from "../../types/globalType";
import { getAuthData } from "../../apis/fetch";
import { apiUrl } from "../../apis/env";
import { Container } from "../../components/container/Container";
import { HabitCardSkeleton } from "./HabitCardSkeleton";
import { HabitCard } from "./HabitCard";
import { EmptyHabitCard } from "./EmtpyHabitCard";
import { Modal } from "../../components/modal/Modal";
import { HabitModal } from "./modal/HabitModal";
import { BackButton } from "../../components/button/BackButton";

//TODO - 값이 없을시 처리
export function HabitListPage() {
  const navigate = useNavigate();
  const { token, clearToken } = useAuthTokenStore();

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
        clearToken();
        navigate("/login", { replace: true });
      }
    }
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [isError, error?.message]);

  return (
    <div className="">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={() => navigate("/")}>{"<<"}</BackButton>
      </div>
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
