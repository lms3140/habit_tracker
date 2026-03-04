import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { ButtonLink } from "../../components/button/ButtonLink";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-lvh bg-ds-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-ds-surface border border-ds-border rounded-ds-lg shadow-ds p-6 space-y-4">
        <h1 className="text-2xl font-bold text-ds-ink">404</h1>
        <p className="text-sm text-ds-ink-muted">
          요청하신 페이지를 찾을 수 없습니다.
        </p>

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-ds border border-ds-border bg-ds-surface text-ds-ink"
          >
            뒤로가기
          </Button>
          <ButtonLink
            to="/"
            replace
            className="px-4 py-2 rounded-ds bg-ds-primary text-ds-ink"
          >
            홈으로
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
