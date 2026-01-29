export function HabitCardSkeleton() {
  return (
    <div className="p-4 border rounded-xl space-y-3 animate-pulse">
      <div className="h-4 w-1/3 bg-gray-300 rounded" />
      <div className="h-3 w-2/3 bg-gray-300 rounded" />
      <div className="h-3 w-1/4 bg-gray-300 rounded" />
    </div>
  );
}
