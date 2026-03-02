type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorStateComponent({
  title = "문제가 발생했습니다",
  message = "잠시 후 다시 시도해주세요.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-ds-border bg-ds-surface p-6 shadow-ds">
      <h2 className="text-lg font-semibold text-ds-ink">{title}</h2>
      <p className="mt-2 text-sm text-ds-ink-muted">{message}</p>

      {onRetry && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl border border-ds-border bg-ds-bg px-4 py-2 text-sm font-medium text-ds-ink hover:opacity-90"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}
