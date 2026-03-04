import { useModalStore } from "../../../store/useModalStore";
import { HabitAddForm } from "./components/HabitAddForm";
import { HabitUpdateForm } from "./components/HabitUpdateForm";

export function HabitModal() {
  const forceEdit = useModalStore((s) => s.forceEdit);

  return (
    <div className="w-full">
      {forceEdit ? <HabitUpdateForm /> : <HabitAddForm />}
    </div>
  );
}
