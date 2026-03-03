# Habit Tracker

사용자 인증 후 **습관 목록을 관리**하고, **하루 단위로 체크**할 수 있는 프론트엔드 프로젝트입니다.

## 주요 기능

- 습관 등록/조회 및 하루 단위 체크 관리
- 상태 변경이 잦은 UI를 고려해 **로컬 상태 / 전역 상태 분리**
- 인증/모달/도메인(습관)을 **feature 단위로 구성**

## 기술 스택

React, TypeScript, Vite  
TanStack Query, Zustand, React Router  
Tailwind CSS, React Hook Form, Day.js, Recharts, ESLint

## 폴더 구조(요약)

```text
src
 ├─ apis          # API 요청 및 환경 변수 관리
 ├─ components    # 전역 공통 컴포넌트
 ├─ features      # 기능 단위(feature)
 │   ├─ auth
 │   └─ habit
 │       ├─ components
 │       ├─ modal
 │       ├─ store
 │       └─ api
 ├─ hooks
 ├─ store         # 전역 상태(Zustand)
 ├─ types
 └─ router.tsx
```
