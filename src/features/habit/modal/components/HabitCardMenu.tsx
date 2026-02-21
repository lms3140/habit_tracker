import { TbEdit, TbTrashX } from "react-icons/tb";
import { useModalStore } from "../../../../store/useModalStore";
import type { HabitCardProps } from "../../HabitCard";
import { useHabitModalStore } from "../../store/HabitModalStore";
import { useEffect } from "react";
import { postAuthData } from "../../../../apis/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl } from "../../../../apis/env";
import { useAuthTokenStore } from "../../../../store/useAuthTokenStore";

export function HabitCardMenu({ habitCardObj }: HabitCardProps) {
  const { openModal, setForceEdit } = useModalStore();
  const { setHabitCard, reset } = useHabitModalStore();
  const { token } = useAuthTokenStore();
  useEffect(() => {
    return () => reset();
  }, []);

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
      queryClient.invalidateQueries({ queryKey: ["habitList"] });
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
        <button
          className="p-2
                    rounded-ds-pill
                    text-ds-ink-muted
                    transition-all duration-150
                    hover:bg-ds-accent
                    hover:text-ds-ink
                    hover:scale-105
                    active:scale-95"
          onClick={handleEditBtnClick}
        >
          <TbEdit />
        </button>
      </div>
      <div>
        <button
          className="p-2
                    rounded-ds-pill
                    text-ds-ink-muted
                    transition-all duration-150
                    hover:bg-red-50
                    hover:text-red-600
                    hover:scale-105
                    active:scale-95"
          disabled={deleteHabitMutation.isPending}
          onClick={handleRemoveBtnClick}
        >
          <TbTrashX />
        </button>
      </div>
    </div>
  );
}
