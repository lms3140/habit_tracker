import { useParams } from "react-router-dom";

export function Habit() {
  const { id } = useParams();

  if (!id) {
    return <div>404 띄우기</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold text-gray-800">{"Habit"}</div>
          <div className="text-sm text-gray-500">30일</div>
        </div>
        <div className="w-xl flex items-center justify-center mx-auto">
          <div className="grid grid-cols-5 gap-4">
            {/* {[].checkList.map((isChecked, i) => (
              <div className="w-full flex justify-center">
                <button
                  key={i}
                  className={`
              w-12 h-12 rounded-xl text-sm font-medium transition
              flex items-center justify-center 
              ${
                isChecked
                  ? "bg-green-400 text-white hover:bg-green-500"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
                  onClick={() => setCheckList(id, i)}
                >
                  {i + 1}
                </button>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
