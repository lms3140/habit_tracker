# Habit Tracker

습관 관리 웹 애플리케이션으로,  
사용자 인증 후 습관 목록과 하루 단위 체크를 관리할 수 있는 프론트엔드 프로젝트입니다.

---

## 프로젝트 개요

- 사용자는 습관을 등록하고, 하루 단위로 체크 상태를 관리할 수 있습니다.
- 상태 변경이 잦은 UI 특성을 고려해 **로컬 상태와 전역 상태를 분리**하여 관리했습니다.
- 메인 서비스와 인증, 모달, 상태 관리를 **기능 단위(feature) 기준으로 분리**해 구성했습니다.

---

## 기술 스택

React, TypeScript, React Router,  
Tailwind CSS, React Hook Form, Zustand, TanStack Query, Day.js  
Vite, ESLint

## 폴더 구조

```text
src
 ├─ apis          # API 요청 및 환경 변수 관리
 ├─ components    # 전역 공통 컴포넌트
 ├─ features      # 기능 단위(feature) 구성
 │   ├─ auth      # 인증 관련 페이지
 │   └─ habit     # 습관 도메인
 │       ├─ components
 │       ├─ modal
 │       ├─ store
 │       └─ api
 ├─ hooks         # 공통 커스텀 훅
 ├─ store         # 전역 상태(Zustand)
 ├─ types         # 전역 타입 정의
 └─ router.tsx    # 라우팅 설정
```

## 구조 설계 기준

### 1. 기능(feature) 기준 분리

- `auth`, `habit`처럼 도메인 단위로 폴더를 구성했습니다.
- 기능 확장 시 다른 도메인에 영향을 주지 않도록 책임 범위를 명확히 하기 위함입니다.

### 2. 전역 상태와 도메인 상태 분리

- 인증 토큰, 모달 상태처럼 여러 기능에서 공통으로 사용하는 상태는 전역 store로 관리했습니다.
- 습관 관련 상태는 `habit` 도메인 내부 store에서 관리해 관심사를 분리했습니다.

### 3. 상태 변경이 잦은 UI 분리

- 카드, 모달, 폼 입력 등 상태 변경이 잦은 UI를 컴포넌트 단위로 분리했습니다.
- 상태 변화에 따른 화면 반응이 구조적으로 드러나도록 구성했습니다.

```

```
