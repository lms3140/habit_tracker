import { HiPlusCircle } from "react-icons/hi";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";

type EmptyHabitCardProps = {
  onClick: () => void;
};

export function EmptyHabitCard({ onClick }: EmptyHabitCardProps) {
  return (
    <Card>
      <Button
        type="button"
        variant="secondary"
        onClick={onClick}
        aria-label="새 습관 추가"
        className="w-full h-full"
      >
        <HiPlusCircle size={50} aria-hidden />
      </Button>
    </Card>
  );
}
