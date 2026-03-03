import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/button/Button";
import { useAlert } from "../../../hooks/useAlert";
import { useAuthTokenStore } from "../../../store/useAuthTokenStore";
import { useModalStore } from "../../../store/useModalStore";
import { removeHabitDay } from "../HabitAPI";
import { useGetHabitList } from "../hook/useHabitList";
import { useHabitDayModalStore } from "../store/HabitDayStore";
import { HabitDayForm } from "./components/HabitDayForm";
import { HabitDayInfo } from "./components/HabitDayInfo";
import { habitQueryKeys, parseHabitId } from "../habitQueryKeys";
import { ApiError } from "../../../apis/fetch";

export function HabitDayModal() {
  const { id } = useParams();
  const habitId = parseHabitId(id);
  const { habitIndex } = useHabitDayModalStore();
  const { token } = useAuthTokenStore();
  const { setForceEdit, forceEdit, closeModal } = useModalStore();

  const { error, success } = useAlert();

  const queryClient = useQueryClient();

  const removeHabitMutation = useMutation({
    mutationFn: (habitDayId: number) => {
      if (!token || !habitId) {
        throw new ApiError({
          code: "UNAUTHORIZED",
          message: "Missing token or habitId",
        });
      }
      return removeHabitDay(habitDayId, token);
    },
    onSuccess: async () => {
      if (!habitId) return;
      await queryClient.invalidateQueries({
        queryKey: habitQueryKeys.habitDayList(habitId),
      });
      success("삭제했습니다.");
      closeModal();
    },
    onError: (e) => {
      if (e instanceof ApiError) {
        if (e.code === "UNAUTHORIZED") {
          error("세션이 만료되었습니다.");
          return;
        }
        if (e.status === 403) return error("권한이 없습니다.");
        if (e.status === 404) return error("대상이 존재하지 않습니다.");
      }
      error("삭제에 실패했습니다. 다시 시도해 주세요.");
    },
  });
  const { data: habitDays } = useGetHabitList({ id: habitId, token });

  const target = habitDays?.find((v) => v.habitIndex === habitIndex);

  const handleDayRemoveBtn = () => {
    if (!target) return;

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    removeHabitMutation.mutate(target.habitDayId);
  };
  if (habitIndex === null || !habitId || !token) return null;

  const editMode = forceEdit || !target;

  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        {editMode ? (
          <HabitDayForm habitId={habitId} />
        ) : (
          <HabitDayInfo habitDay={target} />
        )}
      </div>

      {editMode ? null : (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDayRemoveBtn}
            disabled={removeHabitMutation.isPending}
          >
            삭제하기
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={() => {
              setForceEdit(true);
            }}
          >
            수정하기
          </Button>
        </div>
      )}
    </div>
  );
}
