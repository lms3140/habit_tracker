import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../apis/env";
import { ApiError, getAuthData } from "../../apis/fetch";
import { Container } from "../../components/container/Container";
import { ErrorStateComponent } from "../../components/ErrorState/ErrorStateComponent";
import { Modal } from "../../components/modal/Modal";
import { ThemeSwitcher } from "../../components/themeSwitcher/themeSwitcher";
import { useAuthTokenStore } from "../../store/useAuthTokenStore";
import { useModalStore } from "../../store/useModalStore";
import type { IHabitCard } from "../../types/globalType";
import { EmptyHabitCard } from "./EmtpyHabitCard";
import { HabitCard } from "./HabitCard";
import { HabitCardSkeleton } from "./HabitCardSkeleton";
import { habitQueryKeys } from "./habitQueryKeys";
import { HabitModal } from "./modal/HabitModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../../components/button/Button";

const PAGE_SIZE = 9;

export function HabitListPage() {
  const token = useAuthTokenStore((s) => s.token);
  const isModalOpen = useModalStore((s) => s.isModalOpen);
  const closeModal = useModalStore((s) => s.closeModal);
  const openModal = useModalStore((s) => s.openModal);
  const isCloseBlocked = useModalStore((s) => s.isCloseBlocked);
  const isDirty = useModalStore((s) => s.isDirty);
  const isNewestFirst = true;
  const { isLoading, isError, error, data, refetch } = useQuery<
    IHabitCard[] | null
  >({
    queryKey: habitQueryKeys.habitList(),
    queryFn: async () => {
      return await getAuthData<IHabitCard[]>({
        url: `${apiUrl}/habit/list`,
        token,
      });
    },
    enabled: Boolean(token),
    select: (data) => {
      if (!data) return null;
      const copy = [...data];
      return isNewestFirst ? copy.reverse() : copy;
    },
  });
  const [page, setPage] = useState(1);

  const habits = data ?? [];

  const totalPages = Math.max(1, Math.ceil(habits.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedHabits = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return habits.slice(start, start + PAGE_SIZE);
  }, [habits, page]);
  console.log(pagedHabits);

  const handleModalClose = useCallback(() => {
    const { isDirty, isCloseBlocked } = useModalStore.getState();
    if (isCloseBlocked) return;

    if (isDirty) {
      const ok = window.confirm("작성 중인 내용이 있습니다. 닫으시겠습니까?");
      if (!ok) return;
      closeModal();
    }
    closeModal();
  }, [closeModal]);
  return (
    <div className="min-h-dvh bg-ds-bg">
      <header className="sticky top-0 z-10 border-b border-ds-border bg-ds-bg/80 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between gap-3 py-4">
            <div>
              <h1 className="text-xl font-semibold text-ds-ink">
                Habit Tracker
              </h1>
              <p className="text-sm text-ds-ink-muted">
                습관을 추가하고 매일 체크하세요.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <ThemeSwitcher />
            </div>
          </div>
        </Container>
      </header>

      {/* Main */}
      <main>
        <Container>
          <div className="py-8">
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
                {(pagedHabits?.length ?? 0) === 0 && (
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

                <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <EmptyHabitCard onClick={openModal} />
                  {pagedHabits?.map((v) => (
                    <HabitCard habitCardObj={v} key={v.habitId} />
                  ))}
                </div>
              </>
            )}
            {habits.length > PAGE_SIZE ? (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  이전
                </Button>

                <span className="text-sm text-ds-ink-muted">
                  {page} / {totalPages}
                </span>

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  다음
                </Button>
              </div>
            ) : null}

            <Modal
              isOpen={isModalOpen}
              onRequestClose={handleModalClose}
              isCloseBlocked={isCloseBlocked}
            >
              <HabitModal />
            </Modal>
          </div>
        </Container>
      </main>
    </div>
  );
}
