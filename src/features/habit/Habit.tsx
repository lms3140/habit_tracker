import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../apis/env";
import { ApiError, getAuthData } from "../../apis/fetch";
import { Modal } from "../../components/modal/Modal";
import { useAuthTokenStore } from "../../store/useAuthTokenStore";
import { useModalStore } from "../../store/useModalStore";
import type { HabitCompleted, HabitDay } from "./habitType";
import { HabitDayModal } from "./modal/HabitDayModal";
import { useHabitDayModalStore } from "./store/HabitDayStore";
import type { IHabitCard } from "../../types/globalType";
import { useHabitDayCsvExport } from "../../hooks/useHabitDayCsvExport";
import { HabitPieChart } from "./HabitPieChart";
import { NotFoundPage } from "../error/NotFoundPage";
import { ErrorStateComponent } from "../../components/ErrorState/ErrorStateComponent";
import { habitQueryKeys } from "./habitQueryKeys";
import { Button } from "../../components/button/Button";
import { Page } from "../../components/page/Page";
import { Container } from "../../components/container/Container";

const stateMap: Record<HabitCompleted | "EMPTY", string> = {
  SUCCESS:
    "bg-ds-primary border-transparent text-ds-ink hover:bg-ds-primary-hover",
  FAILED: "bg-ds-danger border-ds-border text-ds-ink hover:bg-ds-danger-hover",
  EMPTY: "bg-ds-bg border-ds-border text-ds-ink hover:bg-ds-accent",
};

export function Habit() {
  const { id } = useParams();
  const token = useAuthTokenStore((s) => s.token);
  const setHabitIndex = useHabitDayModalStore((s) => s.setHabitIndex);
  const isModalOpen = useModalStore((s) => s.isModalOpen);
  const closeModal = useModalStore((s) => s.closeModal);
  const openModal = useModalStore((s) => s.openModal);
  const isCloseBlocked = useModalStore((s) => s.isCloseBlocked);
  const { exportCsv } = useHabitDayCsvExport();
  const navigate = useNavigate();

  const habitId = Number(id);

  const {
    data,
    isError,
    error,
    refetch,
    isLoading: isHabitDayLoading,
  } = useQuery<HabitDay[] | null>({
    queryKey: habitQueryKeys.habitDayList(habitId),
    queryFn: async () => {
      return await getAuthData<HabitDay[]>({
        url: `${apiUrl}/habit-day/${habitId}`,
        token,
      });
    },
    enabled: Boolean(habitId) && Boolean(token),
  });

  const {
    data: habitData,
    isLoading: isHabitLoading,
    isError: isHabitError,
    error: habitError,
  } = useQuery<IHabitCard | null>({
    queryKey: habitQueryKeys.habitDetail(habitId),
    queryFn: async () =>
      getAuthData<IHabitCard>({
        url: `${apiUrl}/habit/get-one?habitId=${habitId}`,
        token,
      }),
    enabled: Boolean(habitId) && Boolean(token),
  });

  const days = useMemo(() => {
    const base = Array.from({ length: 30 }, () => null as HabitDay | null);
    (data ?? []).forEach((day) => {
      base[day.habitIndex] = day;
    });
    return base;
  }, [data]);

  const isLoading = isHabitDayLoading || isHabitLoading;
  const isValidParams = Number.isInteger(habitId) && habitId > 0;

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

  if (!isValidParams) {
    return <NotFoundPage />;
  }

  const handleClickDay = (index: number) => {
    if (isLoading) return;
    setHabitIndex(index);
    openModal();
  };

  // habitDetail 에러 처리
  if (isHabitError && habitError instanceof ApiError) {
    if (habitError.status === 404) return <NotFoundPage />;

    if (habitError.status === 403) {
      return (
        <ErrorStateComponent
          title="권한이 없습니다"
          message="해당 습관에 접근할 수 없습니다."
          onRetry={() => navigate("/habit", { replace: true })}
        />
      );
    }
  }

  // dayList 에러처리
  if (isError && error instanceof ApiError) {
    if (error.status === 404) return <NotFoundPage />;

    if (error.status === 403) {
      return (
        <ErrorStateComponent
          title="권한이 없습니다"
          message="해당 습관에 접근할 수 없습니다."
          onRetry={() => navigate("/habit", { replace: true })}
        />
      );
    }

    if (error.status === 400) {
      return (
        <ErrorStateComponent
          title="잘못된 요청입니다"
          message="주소를 확인하거나 목록으로 돌아가 다시 시도해주세요."
          onRetry={() => navigate("/habit", { replace: true })}
        />
      );
    }

    return (
      <ErrorStateComponent
        title="오류가 발생했습니다"
        message={error.message}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Page>
      <Container className="bg-ds-surface border border-ds-border rounded-ds-lg shadow-ds px-6 py-7 mb-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-ds-ink">
            {habitData?.habitTitle ?? "습관"}
            {isLoading && (
              <span className="ml-2 text-sm font-normal text-ds-ink-muted">
                불러오는 중…
              </span>
            )}
          </div>

          <div className="text-sm text-ds-ink-muted flex items-center gap-3">
            <span>30일</span>
            <Button
              type="button"
              disabled={!data || isLoading}
              onClick={() => {
                if (!data) return;
                exportCsv(data, "list.csv");
              }}
              className={`rounded-ds px-3 py-1 border border-ds-border ${
                !data || isLoading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-ds-accent"
              }`}
            >
              export
            </Button>
          </div>
        </div>

        {/* Empty 안내*/}
        {!isLoading && (data?.length ?? 0) === 0 && (
          <div className="mt-4 rounded-ds border border-ds-border bg-ds-bg p-3 text-sm text-ds-ink">
            아직 기록이 없습니다.
            <span className="text-ds-ink-muted">
              {" "}
              날짜를 눌러 첫 기록을 남겨보세요.
            </span>
          </div>
        )}

        {/* Grid */}
        <div className="mt-7 flex justify-center">
          <div className="grid grid-cols-5 gap-4">
            {days.map((habitDay, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleClickDay(i)}
                disabled={isLoading}
                className={`
                    w-12 h-12 rounded-ds text-sm font-medium
                    flex items-center justify-center border transition
                    active:scale-[0.98]
                    outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2
                    ${stateMap[habitDay?.completed ?? "EMPTY"]}
                    ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
                  `}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </Container>

      <Container className="bg-ds-surface border border-ds-border rounded-ds-lg shadow-ds px-6 py-7">
        <h3 className="text-sm font-semibold text-ds-ink mb-2">
          성공/실패 비율
        </h3>

        {/* 차트 null 방어*/}
        <HabitPieChart habitList={data ?? null} />
      </Container>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        isCloseBlocked={isCloseBlocked}
      >
        <HabitDayModal />
      </Modal>
    </Page>
  );
}
