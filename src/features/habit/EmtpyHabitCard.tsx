import { HiPlusCircle } from "react-icons/hi";

type EmptyHabitCardProps = {
  onClick: () => void;
};

export function EmptyHabitCard({ onClick }: EmptyHabitCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        bg-ds-surface
        rounded-ds
        border border-ds-border
         hover:border-ds-primary
        shadow-ds
        transition-all duration-200 ease-out
        hover:-translate-y-1
        hover:shadow-lg
        active:translate-y-0
        p-4
        text-ds-ink
        active:bg-ds-accent
        text-7xl
        flex
        justify-center
        items-center
        "
    >
      <HiPlusCircle />
    </div>
  );
}
