import { useModalStore } from "../../../store/useModalStore";
import { HabitAddForm } from "./components/HabitAddForm";
import { HabitUpdateForm } from "./components/HabitUpdateForm";

export function HabitModal() {
  const { forceEdit } = useModalStore();

  return (
    <div className="w-full">
      {forceEdit ? <HabitUpdateForm /> : <HabitAddForm />}
    </div>
  );
}
