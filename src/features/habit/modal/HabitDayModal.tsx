import { useForm } from "react-hook-form";
import { postAuthData } from "../../../apis/fetch";
import { apiUrl } from "../../../apis/env";
import { useAuthTokenStore } from "../../../store/useAuthTokenStore";

type HabitDayModalProps = {
  habitId: number;
  habitIndex: number;
};

type HabitDayForm = {
  habitComment: string;
};

export function HabitDayModal({ habitId, habitIndex }: HabitDayModalProps) {
  const { register, handleSubmit } = useForm<HabitDayForm>();
  const { token } = useAuthTokenStore();
  const onSubmitHabitDay = (data: HabitDayForm) => {
    const postData = {
      habitId,
      isChecked: true,
      habitIndex,
      habitComment: data.habitComment,
    };

    postAuthData({ url: `${apiUrl}/add`, data: postData, token });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHabitDay)}>
        <textarea {...register("habitComment")} />
      </form>
    </div>
  );
}
