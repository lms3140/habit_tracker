import { TbEdit, TbTrashX } from "react-icons/tb";
import { useModalStore } from "../../../../store/useModalStore";
import type { HabitCardProps } from "../../HabitCard";
import { useHabitModalStore } from "../../store/HabitModalStore";
import { useEffect } from "react";

export function HabitCardMenu({ habitCardObj }: HabitCardProps) {
  const { openModal, setForceEdit } = useModalStore();
  const { habitCard, setHabitCard, reset } = useHabitModalStore();

  useEffect(() => {
    return () => reset();
  }, []);

  const handleEditBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForceEdit(true);
    setHabitCard(habitCardObj);
    openModal();
  };
  const handleRemoveBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex text-xl">
      <div>
        <button className="p-1" onClick={handleEditBtnClick}>
          <TbEdit />
        </button>
      </div>
      <div>
        <button className="p-1" onClick={handleRemoveBtnClick}>
          <TbTrashX />
        </button>
      </div>
    </div>
  );
}
