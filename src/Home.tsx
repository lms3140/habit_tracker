import { useState } from "react";
import { HabitCard } from "./components/HabitCard/HabitCard";
import { Modal } from "./components/modal/Modal";
import { useHabit } from "./store/useHabit";

function Home() {
  const { habits } = useHabit();
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-yellow-50">
      <div className="container h-dvh mx-auto">
        <h1 className="text-center text-3xl py-8">Habit Tracker</h1>
        <div>
          {habits.map((v) => (
            <HabitCard habitCardObj={v} key={v.id} />
          ))}
        </div>
        <div>
          <button onClick={() => setModalOpen((prev) => !prev)}>하이</button>
        </div>
        <Modal
          open={isModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <div>ㅎㅎ</div>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
