import { useState, type FormEvent, type ReactElement } from "react";
import { postData } from "../../apis/fetch";
import { apiUrl } from "../../apis/env";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await postData({
      url: `${apiUrl}/user/login`,
      data: {
        userId: id,
        password: pw,
      },
    });
    const token = resp.token;
    localStorage.setItem("token", token);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">로그인</h2>
          <p className="text-gray-600 text-sm">계정에 로그인하세요</p>
        </div>

        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
          placeholder="아이디"
          className="
      w-full px-4 py-3
      border border-gray-300 rounded-lg
      text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      placeholder-gray-400
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
      border border-gray-300 rounded-lg
      text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      placeholder-gray-400
      transition-all
    "
        />

        <button
          type="submit"
          className="
      w-full px-4 py-3
      bg-blue-500 hover:bg-blue-600
      text-white font-semibold
      rounded-lg
      transition-all
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      active:scale-95
    "
        >
          로그인
        </button>

        <div className="text-center">
          <a href="#" className="text-blue-500 hover:text-blue-600 text-sm">
            비밀번호를 잊으셨나요?
          </a>
        </div>
      </form>
    </div>
  );
}
