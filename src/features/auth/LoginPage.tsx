import { useState, type FormEvent } from "react";
import { postData, ApiError } from "../../apis/fetch";
import { apiUrl } from "../../apis/env";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthTokenStore } from "../../store/useAuthTokenStore";
import { Button } from "../../components/button/Button";

export function LoginPage() {
  const setToken = useAuthTokenStore((s) => s.setToken);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await postData<{ token: string }>({
        url: `${apiUrl}/user/login`,
        data: {
          userId: id,
          password: pw,
        },
      });
      if (!resp) throw new Error("서버 응답이 없습니다.");
      const token = resp.token;
      setToken(token);
      navigate("/");
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        console.error(err);
      }
    }
  };

  const reason = new URLSearchParams(location.search).get("reason");
  const isExpired = reason === "expired";

  return (
    <div className="min-h-screen flex items-center justify-center bg-ds-bg p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-ds-surface rounded-ds-lg shadow-ds p-8 space-y-6 border border-ds-border"
      >
        <div>
          <h2 className="text-2xl font-bold text-ds-ink mb-2">로그인</h2>
          <p className="text-ds-ink-muted text-sm">계정에 로그인하세요</p>
        </div>

        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
          placeholder="아이디"
          className="
          w-full px-4 py-3
          border border-ds-border rounded-ds
          bg-ds-surface
          text-sm text-ds-ink placeholder:text-ds-ink-muted/70
          focus:outline-none focus:ring-2 focus:ring-ds-ring focus:border-transparent
          transition-all
        "
        />

        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.currentTarget.value)}
          placeholder="비밀번호"
          className="
          w-full px-4 py-3
          border border-ds-border rounded-ds
          bg-ds-surface
          text-sm text-ds-ink placeholder:text-ds-ink-muted/70
          focus:outline-none focus:ring-2 focus:ring-ds-ring focus:border-transparent
          transition-all
        "
        />

        <Button
          type="submit"
          className="
          w-full px-4 py-3
          bg-ds-primary hover:bg-ds-primary-hover
          text-ds-ink font-semibold
          rounded-ds
          transition-all
          focus:outline-none focus:ring-2 focus:ring-ds-ring focus:ring-offset-2 focus:ring-offset-ds-bg
          active:scale-95
        "
        >
          로그인
        </Button>
        {isExpired && (
          <div className="text-ds-ink-muted text-sm text-center">
            세션이 만료되었습니다. 다시 로그인해주세요.
          </div>
        )}
      </form>
    </div>
  );
}
