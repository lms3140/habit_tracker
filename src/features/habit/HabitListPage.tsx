import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthTokenStore } from "../../store/useAuthTokenStore";
import { useModalStore } from "../../store/useModalStore";
import type { IHabitCard } from "../../types/globalType";
import { getAuthData, ApiError } from "../../apis/fetch";
import { apiUrl } from "../../apis/env";
import { Container } from "../../components/container/Container";
import { HabitCardSkeleton } from "./HabitCardSkeleton";
import { HabitCard } from "./HabitCard";
import { EmptyHabitCard } from "./EmtpyHabitCard";
import { Modal } from "../../components/modal/Modal";
import { HabitModal } from "./modal/HabitModal";
import { BackButton } from "../../components/button/BackButton";
import { ErrorStateComponent } from "../../components/ErrorState/ErrorStateComponent";

//TODO - 값이 없을시 처리
export function HabitListPage() {
  const navigate = useNavigate();
  const { token } = useAuthTokenStore();

  const { isModalOpen, closeModal, openModal } = useModalStore();

  const { isLoading, isError, error, data, refetch } = useQuery<
    IHabitCard[] | null
  >({
    queryKey: ["habitList"],
    queryFn: async () => {
      return await getAuthData<IHabitCard[]>({
        url: `${apiUrl}/habit/list`,
        token,
      });
    },
    enabled: Boolean(token),
  });

  return (
    <div className="">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={() => navigate("/")}>{"<<"}</BackButton>
      </div>
      <Container>
        <h1 className="text-center text-3xl py-8">Habit Tracker</h1>

        {isLoading ? (
          <HabitCardSkeleton />
        ) : isError ? (
          <ErrorStateComponent
            title="습관 목록을 불러오지 못했습니다"
            message={
              error instanceof ApiError
                ? error.message
                : "오류가 발생했습니다. 다시 시도해주세요."
            }
            onRetry={() => refetch()}
          />
        ) : (
          <>
            {(data?.length ?? 0) === 0 && (
              <div className="mb-4 rounded-ds border border-ds-border bg-ds-surface p-4 shadow-ds">
                <p className="text-sm text-ds-ink">
                  아직 습관이 없습니다.
                  <span className="text-ds-ink-muted">
                    {" "}
                    아래의 + 카드를 눌러 새 습관을 추가해보세요.
                  </span>
                </p>
              </div>
            )}
            <div className="grid grid-cols-3">
              {data?.map((v) => (
                <HabitCard habitCardObj={v} key={v.habitId} />
              ))}
              <EmptyHabitCard onClick={openModal} />
            </div>
          </>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <HabitModal />
        </Modal>
      </Container>
    </div>
  );
}
