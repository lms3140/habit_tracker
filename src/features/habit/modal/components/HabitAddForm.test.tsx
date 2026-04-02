import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { HabitAddForm } from "./HabitAddForm";
import { ApiError, postAuthData } from "../../../../apis/fetch";

const mockSuccess = vi.fn();
const mockError = vi.fn();
const mockProgramCloseModal = vi.fn();
const mockSetDirty = vi.fn();

vi.mock("../../../../hooks/useAlert", () => ({
  useAlert: () => ({
    success: mockSuccess,
    error: mockError,
  }),
}));

vi.mock("../../../../store/useAuthTokenStore", () => ({
  useAuthTokenStore: (selector: (state: { token: string }) => unknown) =>
    selector({ token: "test-token" }),
}));

vi.mock("../../../../store/useModalStore", () => ({
  useModalStore: (
    selector: (state: {
      programCloseModal: () => void;
      setDirty: (value: boolean) => void;
    }) => unknown,
  ) =>
    selector({
      programCloseModal: mockProgramCloseModal,
      setDirty: mockSetDirty,
    }),
}));

vi.mock("../../../../apis/env", () => ({
  apiUrl: "http://test-api",
}));

vi.mock(import("../../../../apis/fetch"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    postAuthData: vi.fn(),
  };
});

function renderHabitAddForm() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <HabitAddForm />
    </QueryClientProvider>,
  );
}

function setup() {
  const user = userEvent.setup();
  renderHabitAddForm();
  const input = screen.getByPlaceholderText("무엇을 꾸준히 해볼까요?");
  const submitButton = screen.getByRole("button", { name: "등록" });

  const submit = async (title?: string) => {
    if (title) {
      await user.type(input, title);
    }
    await user.click(submitButton);
  };
  return { user, input, submitButton, submit };
}

describe("HabitAddForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("습관 추가 제출 성공 시 성공 알림을 띄우고 모달을 닫는다", async () => {
    const { submit } = setup();

    vi.mocked(postAuthData).mockResolvedValue({});
    await submit("물 마시기");

    await waitFor(() => {
      expect(postAuthData).toHaveBeenCalledWith({
        url: "http://test-api/habit/add",
        data: { habitTitle: "물 마시기" },
        token: "test-token",
      });
      expect(mockSuccess).toHaveBeenCalledWith("성공!");
      expect(mockProgramCloseModal).toHaveBeenCalled();
    });

    expect(mockError).not.toHaveBeenCalled();
  });

  it("제목이 비어 있으면 제출해도 성공 처리되지 않는다", async () => {
    const { submit } = setup();

    await submit("");

    expect(mockSuccess).not.toHaveBeenCalled();
    expect(postAuthData).not.toHaveBeenCalled();
    expect(mockProgramCloseModal).not.toHaveBeenCalled();
  });

  it("요청이 실패하면 실패 알림을 띄우고 모달을 닫지 않는다", async () => {
    const { submit } = setup();
    vi.mocked(postAuthData).mockRejectedValue(
      new ApiError({
        code: "HTTP_ERROR",
        status: 500,
        message: "요청에 실패했습니다. (HTTP 500)",
      }),
    );

    await submit("물 마시기");

    expect(postAuthData).toHaveBeenCalledWith({
      url: "http://test-api/habit/add",
      data: { habitTitle: "물 마시기" },
      token: "test-token",
    });
    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith("실패");
      expect(mockSuccess).not.toHaveBeenCalled();
      expect(mockProgramCloseModal).not.toHaveBeenCalled();
    });
  });
});
