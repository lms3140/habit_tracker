import { TbEdit, TbTrashX } from "react-icons/tb";
import { useModalStore } from "../../../../store/useModalStore";
import type { HabitCardProps } from "../../HabitCard";
import { useHabitModalStore } from "../../store/HabitModalStore";
import { useEffect } from "react";
import { postAuthData } from "../../../../apis/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl } from "../../../../apis/env";
import { useAuthTokenStore } from "../../../../store/useAuthTokenStore";
import { habitQueryKeys } from "../../habitQueryKeys";
import { Button } from "../../../../components/button/Button";

export function HabitCardMenu({ habitCardObj }: HabitCardProps) {
  const openModal = useModalStore((s) => s.openModal);
  const setForceEdit = useModalStore((s) => s.setForceEdit);
  const setHabitCard = useHabitModalStore((s) => s.setHabitCard);
  const reset = useHabitModalStore((s) => s.reset);
  const token = useAuthTokenStore((s) => s.token);
  useEffect(() => {
    return () => reset();
  }, [reset]);

  const handleEditBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForceEdit(true);
    setHabitCard(habitCardObj);
    openModal();
  };

  const queryClient = useQueryClient();
  const deleteHabitMutation = useMutation({
    mutationFn: (habitId: string) =>
      postAuthData({
        url: `${apiUrl}/habit/remove`,
        data: { habitId },
        token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitQueryKeys.habitList() });
      alert("삭제성공");
    },
  });

  const handleRemoveBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = confirm("진짜?");
    if (res) {
      deleteHabitMutation.mutate(habitCardObj.habitId);
    } else {
      alert("ㄴㄴ");
    }
  };

  return (
    <div className="flex text-xl justify-end">
      <div>
        <Button
          type="button"
          variant="primary"
          size="icon"
          onClick={handleEditBtnClick}
          ghostMode
        >
          <TbEdit />
        </Button>
      </div>
      <div>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          disabled={deleteHabitMutation.isPending}
          onClick={handleRemoveBtnClick}
          ghostMode
        >
          <TbTrashX />
        </Button>
      </div>
    </div>
  );
}
