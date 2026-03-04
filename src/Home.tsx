import { Link } from "react-router-dom";
import { useAuthTokenStore } from "./store/useAuthTokenStore";
import { ButtonLink } from "./components/button/ButtonLink";

function Home() {
  const token = useAuthTokenStore((s) => s.token);

  return (
    <div className="min-h-lvh bg-ds-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-ds-surface border border-ds-border rounded-ds-lg shadow-ds p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-ds-ink">홈</h1>
          <p className="mt-2 text-sm text-ds-ink-muted">
            상태:{" "}
            <span className="font-semibold text-ds-ink">
              {token ? "로그인됨" : "로그인 안됨"}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <ButtonLink to="/habit">습관</ButtonLink>

          {!token && (
            <Link
              to="/login"
              className="
                w-full px-4 py-3 text-center font-semibold
                rounded-ds border border-ds-border bg-ds-surface
                text-ds-ink transition-all active:scale-95
                focus:outline-none focus:ring-2 focus:ring-ds-ring focus:ring-offset-2 focus:ring-offset-ds-bg
              "
            >
              로그인 하러 가기
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1.5 rounded-ds-pill border border-ds-border bg-ds-surface text-sm">
            <span className="text-ds-ink-muted">인증</span>
            <span className="ml-2 font-medium text-ds-ink">
              {token ? "ON" : "OFF"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
