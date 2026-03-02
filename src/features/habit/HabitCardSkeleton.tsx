export function HabitCardSkeleton() {
  const skeletonCount = 6;

  return (
    <div className="grid grid-cols-3">
      {Array.from({ length: skeletonCount }).map((_, idx) => (
        <div
          key={idx}
          className="
            bg-ds-surface
            rounded-ds
            border border-ds-border
            shadow-ds
            p-4
            animate-pulse
          "
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="h-6 w-1/2 rounded bg-ds-" />
            <div className="h-6 w-6 rounded-full bg-ds-accent" />
          </div>
          <div className="mb-4 h-4 w-20 rounded bg-ds-accent" />
          <div className="mb-4 h-4 w-2/3 rounded bg-ds-accent" />
          <div className="flex items-center gap-3">
            <div className="h-2 w-full rounded-ds-pill bg-ds-accent" />
            <div className="h-4 w-8 rounded bg-ds-accent" />
          </div>
        </div>
      ))}
    </div>
  );
}
