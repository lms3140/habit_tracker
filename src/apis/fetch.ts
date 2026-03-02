export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "HTTP_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT";

export class ApiError extends Error {
  code: ApiErrorCode;
  status?: number;

  constructor(params: {
    code: ApiErrorCode;
    message: string;
    status?: number;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.code = params.code;
    this.status = params.status;
  }
}

type RequestParams = {
  url: string;
  method: "GET" | "POST";
  token?: string | null;
  data?: unknown;
  timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 10_000;

async function request<T>({
  url,
  method,
  token,
  data,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: RequestParams): Promise<T | null> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: method === "POST" ? JSON.stringify(data ?? {}) : undefined,
      signal: controller.signal,
    });

    if (response.status === 204) return null;

    if (response.status === 401) {
      throw new ApiError({
        code: "UNAUTHORIZED",
        status: 401,
        message: "인증이 필요합니다. 다시 로그인해주세요.",
      });
    }

    if (response.status === 403) {
      throw new ApiError({
        code: "FORBIDDEN",
        status: 403,
        message: "필요한 권한이 없습니다.",
      });
    }

    if (response.status === 404) {
      throw new ApiError({
        code: "NOT_FOUND",
        status: 404,
        message: "존재하지 않는 요청입니다.",
      });
    }

    if (!response.ok) {
      // MVP: 서버 에러 메시지를 굳이 파싱하지 않고 기본 메시지로 통일
      throw new ApiError({
        code: "HTTP_ERROR",
        status: response.status,
        message: `요청에 실패했습니다. (HTTP ${response.status})`,
      });
    }

    return (await response.json()) as T;
  } catch (err: unknown) {
    // 타임아웃
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError({
        code: "TIMEOUT",
        message: "요청 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.",
      });
    }

    // 네트워크 오류
    if (err instanceof TypeError) {
      throw new ApiError({
        code: "NETWORK_ERROR",
        message: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
      });
    }

    // ApiError 그대로 던지기
    if (err instanceof ApiError) throw err;

    // 기타
    throw new ApiError({
      code: "HTTP_ERROR",
      message: "알 수 없는 오류가 발생했습니다.",
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

/** === 외부 공개 API === */

type GetDataParams = { url: string; token?: string | null };
type OnlyUrl = Pick<GetDataParams, "url">;

export const getData = async <T>({ url }: OnlyUrl) => {
  return request<T>({ url, method: "GET" });
};

export const getAuthData = async <T>({ url, token }: GetDataParams) => {
  return request<T>({ url, method: "GET", token });
};

type PostDataParams = {
  url: string;
  data: Record<string, any>;
  token?: string | null;
};
type WithOutTokenParams = Omit<PostDataParams, "token">;

export const postData = async <T>({ url, data }: WithOutTokenParams) => {
  return request<T>({ url, method: "POST", data });
};

export const postAuthData = async <T>({ url, data, token }: PostDataParams) => {
  return request<T>({ url, method: "POST", token, data });
};
