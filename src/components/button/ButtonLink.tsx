import { Link, type LinkProps } from "react-router-dom";
import { buttonClass } from "./buttonStyles";

type ButtonLinkProps = LinkProps & {
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
};
/**
 * ButtonLink
 *
 * React Router의 `<Link />`를 버튼처럼 보이도록 스타일링한 래퍼 컴포넌트입니다.
 * 의미(semantic)는 "페이지 이동(Link)"을 유지하고, 스타일만 Button과 동일하게 맞춥니다.
 *
 * 사용 시점
 * - 페이지 이동이지만 버튼 UI(Primary/Secondary 등)로 보여주고 싶을 때
 *   예) 목록 → 상세, 로그인 페이지 이동, 설정 화면 이동 등
 *
 * 주의
 * - 저장/삭제/제출 같은 "동작(action)"은 `<Button />`을 사용하세요.
 *
 * @param variant 버튼 스타일 변형 (기본값: "primary")
 * @param size 버튼 사이즈 (기본값: "md")
 * @param className 추가 클래스 (옵션). 기본 스타일 위에 덧붙입니다.
 * @param props React Router `LinkProps` (to, replace, state, target 등) 그대로 전달됩니다.
 *
 * @returns 버튼 스타일이 적용된 React Router `<Link />`
 *
 * @example
 * // 기본(primary, md)
 * <ButtonLink to="/habit">습관 목록</ButtonLink>
 *
 * @example
 * // secondary + small
 * <ButtonLink to="/login" variant="secondary" size="sm">
 *   로그인
 * </ButtonLink>
 *
 * @example
 * // state/replace 등 LinkProps도 그대로 사용 가능
 * <ButtonLink to="/login" replace state={{ from: location.pathname }}>
 *   로그인으로 이동
 * </ButtonLink>
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClass({ variant, size, className })} {...props} />
  );
}
