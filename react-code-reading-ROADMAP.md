# React 소스코드 분석 학습 로드맵

> 작성일: 2026-10-14  
> 목적: React API 사용법 암기가 아니라 공식 React 소스코드의 실행 흐름, 자료구조, 설계 의도를 이해하고 경력직 면접에서 설명할 수 있도록 학습한다.

## 1. 학습 원칙

- **대분류는 아키텍처 기준**, 각 분류의 **세부 순서는 실무 활용도와 선수 지식 기준**으로 구성한다.
- React 공식 문서로 공개 동작 규칙을 확인하고, **버전을 고정한 공식 저장소**에서 구현을 검증한다.
- 개별 API를 분석하다 Fiber, Update Queue, Scheduler 등이 필요해지면 해당 부분만 먼저 확인한 뒤 원래 주제로 돌아온다.
- 반복적인 퀴즈 대신 **Playground 실험 → 실제 호출 경로 추적 → 자료구조 확인 → Markdown 정리**로 이해도를 점검한다.
- 이해되지 않는 JavaScript 개념은 `frontend-deep-dive`에서 보충하고, 면접 답변은 `Frontend-Interview-Questions`에 정리한다.

## 2. 현재 수준과 우선순위

아래 평가는 대화에서 확인된 제한적인 답변에 기반한 **잠정 진단**이다. React 전체 역량이나 실제 업무 능력에 대한 평가는 아니다.

| 영역 | 잠정 수준 | 근거 및 보완점 |
|---|---|---|
| 실행 컨텍스트 | B | 이전 학습 기록 기준, 추가 검증 필요 |
| 스코프 / 렉시컬 스코프 | B | 이전 학습 기록 기준, GitHub 반영 여부 미확인 |
| 클로저 | C | 실행 종료 후 참조 유지 원리 보완 필요 |
| React API 사용 | 미평가 | 실무 경험은 있으나 이 대화에서 별도 검증 부족 |
| 상태 스냅샷 | C | 렌더별 변수와 React 상태 저장소를 혼동 |
| Update Queue | C | 값 업데이트와 함수형 업데이트의 차이를 혼동 |
| Fiber / Reconciliation | 미평가 | 소스 분석 전 |
| Scheduler / Commit | 미평가 | 소스 분석 전 |

**우선 집중:** React Hooks의 `useState`와 상태 업데이트 시스템. 다만 진입점과 React Element를 짧게 파악한 후 진행한다.

## 3. 전체 학습 로드맵

| 단계 | 대분류 | 주요 분석 대상 | 예상 기간 |
|---|---|---|---|
| 01 | React 기본 구조와 실행 진입점 | 저장소 구조, JSX, React Element, `createRoot`, `render` | 1주 |
| 02 | React Hooks | State, Effect, Ref, Memoization, Context 및 기타 Hooks | 3~5주 |
| 03 | 렌더링과 Fiber 아키텍처 | FiberNode, Render/Commit, `current` / `workInProgress` | 2주 |
| 04 | 상태 업데이트 시스템 | Update Queue, Batching, Lanes, `dispatchSetState` | 1~2주 |
| 05 | Reconciliation | `beginWork`, `completeWork`, diff, key, 상태 보존 | 2주 |
| 06 | 렌더링 최적화 | `memo`, bailout, React Compiler | 1주 |
| 07 | Context와 데이터 흐름 | Provider, Consumer, Context 전파 | 1주 |
| 08 | React DOM과 이벤트 시스템 | DOM 반영, Synthetic Event, 이벤트 위임 | 1주 |
| 09 | Scheduler와 동시성 | Scheduler, 우선순위, 작업 중단 및 재개 | 1~2주 |
| 10 | Suspense와 비동기 렌더링 | Suspense, `lazy`, Transition, Deferred Value | 1~2주 |
| 11 | Server Components와 Hydration | RSC, SSR, Hydration, Streaming | 2주 |
| 12 | React 아키텍처 종합 | 전체 함수 호출 경로, 자료구조, 설계 의도 | 1주 |

> 기간은 주 3~4회, 회당 약 1시간 학습을 가정한 대략적인 추정치다. 표의 범위를 합산하면 **17~21주**이며, 실제로는 이해도와 주제 간 병행 여부에 따라 달라진다. 공식적으로 권장된 기간은 아니다.

## 4. React Hooks 세부 분석 순서

| 순서 | 그룹 | 분석 대상 | 확인할 핵심 질문 |
|---|---|---|---|
| 2-1 | 상태 관리 | `useState` → `useReducer` | 상태는 어디에 저장되고 업데이트는 어떻게 계산되는가? |
| 2-2 | Effect | `useEffect` → `useLayoutEffect` | 등록·의존성 비교·cleanup·실행 시점은 어떻게 결정되는가? |
| 2-3 | Ref | `useRef` → `useImperativeHandle` | 렌더 간 참조 객체는 어떻게 유지되는가? |
| 2-4 | 메모이제이션 | `useMemo` → `useCallback` | 의존성 비교와 값 재사용은 어떻게 구현되는가? |
| 2-5 | Context | `useContext` | Provider 값은 어떻게 읽히고 변경이 전파되는가? |
| 2-6 | 외부 상태 | `useSyncExternalStore` | 외부 스토어 변경을 어떻게 구독하는가? |
| 2-7 | 동시성 | `useTransition` → `useDeferredValue` | 업데이트 우선순위와 지연 렌더링은 어떻게 처리되는가? |
| 2-8 | 비동기 상태 | `useActionState` → `useOptimistic` | Action과 낙관적 상태를 어떻게 다루는가? |
| 2-9 | 기타 | `useId`, `useDebugValue`, `useInsertionEffect`, `useEffectEvent` | 각 Hook이 해결하는 특수한 문제가 무엇인가? |

> 위 목록은 분석 계획이며 React의 모든 공개 Hook을 빠짐없이 나열했다는 뜻은 아니다. 학습할 릴리스의 [공식 Hooks 목록](https://react.dev/reference/react/hooks)을 기준으로 누락·변경된 API를 확인한다. `use`와 같은 관련 API는 해당 개념 학습 시 별도로 다룬다.

## 5. 저장소 구성

```text
react-code-reading/
├── react-source/              # 공식 소스코드(버전 고정; 별도 clone/submodule)
├── playground/                # Vite + React + TypeScript 실험
├── notes/
│   ├── 01-fundamentals/
│   ├── 02-hooks/
│   │   ├── state/
│   │   ├── effects/
│   │   ├── refs/
│   │   ├── performance/
│   │   └── advanced/
│   ├── 03-fiber-rendering/
│   ├── 04-update-queue/
│   ├── 05-reconciliation/
│   ├── 06-optimization/
│   ├── 07-context/
│   ├── 08-react-dom/
│   ├── 09-scheduler/
│   ├── 10-suspense/
│   ├── 11-server-rendering/
│   └── 12-architecture/
└── README.md
```

- `npm install react`는 앱에서 사용할 패키지 설치이고, **원본 내부 구현 분석**에는 [React 공식 저장소](https://github.com/facebook/react)의 소스가 필요하다.
- `react-source/`는 `.gitignore`로 제외하거나 Git submodule로 관리한다.
- 소스 분석 대상 릴리스 태그/커밋과 Playground의 React 버전을 기록한다.
- npm 배포 패키지와 원본 저장소 개발 환경은 다르다. 원본 내부 코드 디버깅이 필요할 때는 해당 버전의 빌드/테스트 안내를 별도로 따른다.

## 6. 주간 학습 방식

| 회차 | 작업 | 산출물 |
|---|---|---|
| 1회차 | 공식 문서 읽기 + Playground에서 동작 재현 | 재현 코드와 예상/실제 결과 |
| 2회차 | 진입 함수부터 내부 호출 경로 추적 | 호출 흐름 메모 |
| 3회차 | 자료구조, 상태 변화, 설계 의도 분석 | 핵심 코드 근거와 설명 |
| 4회차 | Markdown 문서 정리 및 검토 | `react-code-reading` 커밋 1개 이상 |

**주제별 문서 템플릿**

```md
# 분석 주제
- 분석 React 버전/커밋:
- 공식 문서:
- 실험 코드와 관찰 결과:
- 진입점 및 호출 경로:
- 핵심 자료구조:
- 관련 원본 파일/함수:
- 왜 이렇게 설계했는가? (근거/가설 구분):
- 이해되지 않은 부분과 다음에 확인할 사항:
```

완료 기준: **실제 코드 근거로 호출 경로와 상태/자료구조 변화를 설명하고, 문서로 남길 수 있는가?** 별도 면접 문답을 계속 반복하지 않는다.

## 7. 첫 주 체크리스트

- [ ] React 공식 저장소 소스와 Playground 준비, 분석 버전 기록
- [ ] JSX → React Element 생성 경로 추적
- [ ] `createRoot` → `root.render` 진입점 확인
- [ ] `notes/01-fundamentals/`에 Markdown 문서 1개 커밋

**다음 주:** Hooks의 `useState`부터 시작하고, Dispatcher → Hook 상태 저장 → `mountState` / `updateState`를 추적한다. 이후 `dispatchSetState`와 Update Queue로 연결한다.

## 8. 참고 공식 자료

- [React 공식 GitHub 저장소](https://github.com/facebook/react)
- [React Hooks API Reference](https://react.dev/reference/react/hooks)
- [Render and Commit](https://react.dev/learn/render-and-commit)
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)

> 이 문서는 React 공식 문서의 **정해진 학습 순서**를 옮긴 것이 아니라, 공식 개념 분류와 대화에서 드러난 학습 필요를 토대로 재구성한 개인 학습 로드맵이다. 면접 출제 빈도에 관한 공인 순위 통계에 근거한 순서는 아니다.

---

# 전체 단계별 실행 체크리스트

> 기준일: 2026-10-14  
> 목적: React 공식 소스코드 분석의 **진행 여부와 완료 근거**를 추적한다. 체크박스는 실제로 완료한 뒤 표시한다.

## 진행 원칙

- [ ] 분석할 React 버전(태그 또는 커밋 SHA)을 README에 기록한다.
- [ ] 공식 문서에서 공개 API의 동작 규칙을 먼저 확인한다.
- [ ] Playground에서 최소 재현 예제를 실행하고 결과를 기록한다.
- [ ] 해당 버전의 소스에서 진입점 → 호출 흐름 → 자료구조를 추적한다.
- [ ] `notes/`에 분석 문서 1개 이상을 작성하고 커밋한다.
- [ ] 이해되지 않은 부분을 `미해결 질문`으로 남기고 다음에 보완한다.

## 00. 환경 준비

- [ ] `react-code-reading` 저장소 준비
- [ ] React 공식 저장소를 별도 디렉터리에 복제하거나 submodule로 연결
- [ ] 분석 대상 React 태그/SHA 고정
- [ ] Vite + React + TypeScript Playground 생성
- [ ] Playground의 React 버전 기록 (원본과 비교 시 버전 차이 확인)
- [ ] 소스코드 중복 커밋 방지 설정 (`.gitignore` 또는 submodule)
- [ ] README에 디렉터리 구조와 실행 명령 작성

## 01. React 기본 구조와 실행 진입점

- [ ] `react`, `react-dom`, `react-reconciler`, `scheduler`의 역할 구분
- [ ] JSX 변환 결과 확인
- [ ] React Element 객체 구조 분석
- [ ] `createRoot` 호출 진입점 추적
- [ ] `root.render` 호출 흐름 추적
- [ ] Render / Commit의 개념적 차이 정리
- [ ] `notes/01-fundamentals/` 분석 문서 커밋

## 02. React Hooks

### 2-1. 상태 관리
- [ ] `useState`: 공개 API → Dispatcher 호출 경로
- [ ] `useState`: mount/update 시 Hook 상태 저장 구조
- [ ] `useState`: 값 업데이트와 함수형 업데이트 비교 실험
- [ ] `useReducer`: reducer와 업데이트 처리 흐름

### 2-2. Effects
- [ ] `useEffect`: 등록, 의존성 비교, cleanup 추적
- [ ] `useLayoutEffect`: `useEffect`와 실행 시점 비교
- [ ] `useEffectEvent`: 용도와 구현 경로 확인 (분석 버전 지원 여부 확인)
- [ ] `useInsertionEffect`: 용도와 실행 단계 확인

### 2-3. Refs
- [ ] `useRef`: 객체 생성과 렌더 간 보존 확인
- [ ] `useImperativeHandle`: ref에 노출되는 값 분석

### 2-4. 메모이제이션
- [ ] `useMemo`: 의존성 비교와 결과 재사용
- [ ] `useCallback`: 함수 참조 보존과 `useMemo` 관계

### 2-5. Context
- [ ] `useContext`: 값 읽기와 변경 전파의 연결 지점

### 2-6. 외부 상태
- [ ] `useSyncExternalStore`: snapshot과 구독 동작

### 2-7. 동시성
- [ ] `useTransition`: transition 업데이트 흐름
- [ ] `useDeferredValue`: 지연된 값의 갱신 경로

### 2-8. 비동기 상태
- [ ] `useActionState`: 상태와 액션 처리
- [ ] `useOptimistic`: 낙관적 상태 처리

### 2-9. 기타
- [ ] `useId`: ID 생성과 SSR 관련 동작
- [ ] `useDebugValue`: 디버깅 용도 확인
- [ ] Hooks 전체 분석 문서/링크를 `notes/02-hooks/README.md`에 정리

## 03. 렌더링과 Fiber 아키텍처
- [ ] Fiber 노드의 주요 필드 조사
- [ ] `child`, `sibling`, `return` 연결 관계 도식화
- [ ] `current`와 `workInProgress` 비교
- [ ] Render Phase와 Commit Phase 호출 흐름 정리
- [ ] `notes/03-fiber-rendering/` 커밋

## 04. 상태 업데이트 시스템
- [ ] `dispatchSetState` 호출 경로 추적
- [ ] Update Queue 구조와 처리 순서 설명
- [ ] 여러 `setState` 호출의 batching 실험
- [ ] Lanes가 업데이트 우선순위에 사용되는 방식 조사
- [ ] `notes/04-update-queue/` 커밋

## 05. Reconciliation
- [ ] `beginWork` / `completeWork`의 역할 비교
- [ ] 자식 Fiber 비교 흐름 추적
- [ ] `key`와 타입 변경 시 상태 보존/초기화 실험
- [ ] `notes/05-reconciliation/` 커밋

## 06. 렌더링 최적화
- [ ] `memo`의 비교와 bailout 경로 확인
- [ ] `useMemo` / `useCallback`과 컴포넌트 메모이제이션 구분
- [ ] React Compiler의 역할과 적용 범위 확인
- [ ] `notes/06-optimization/` 커밋

## 07. Context와 데이터 흐름
- [ ] Provider 값 변경 시 전파 흐름 추적
- [ ] Context 소비 컴포넌트의 갱신 경로 확인
- [ ] `notes/07-context/` 커밋

## 08. React DOM과 이벤트 시스템
- [ ] DOM 생성/수정/삭제가 적용되는 지점 추적
- [ ] React 이벤트 시스템과 이벤트 위임 구조 확인
- [ ] Synthetic Event의 역할 정리
- [ ] `notes/08-react-dom/` 커밋

## 09. Scheduler와 동시성
- [ ] Scheduler의 작업 예약 흐름 추적
- [ ] 우선순위와 Lanes의 역할 구분
- [ ] 렌더링 작업 중단/재개가 가능한 조건 조사
- [ ] `notes/09-scheduler/` 커밋

## 10. Suspense와 비동기 렌더링
- [ ] Suspense fallback 전환 동작 실험
- [ ] `lazy`와 코드 분할 동작 확인
- [ ] Transition / Deferred Value와 Suspense 관계 정리
- [ ] `notes/10-suspense/` 커밋

## 11. Server Components와 Hydration
- [ ] CSR, SSR, RSC의 책임 구분
- [ ] Hydration 동작 및 불일치 사례 실험
- [ ] Streaming과 Suspense의 연결 이해
- [ ] Server Functions의 역할 조사
- [ ] `notes/11-server-rendering/` 커밋

## 12. React 내부 설계 종합
- [ ] 최초 렌더링 호출 흐름 다이어그램 작성
- [ ] 상태 업데이트 → 렌더 → 커밋 흐름 다이어그램 작성
- [ ] Hooks / Fiber / Reconciler / Scheduler 연결 관계 정리
- [ ] 주요 설계 트레이드오프 3개 기록
- [ ] `notes/12-architecture/` 최종 문서 커밋

## 참고 자료

- [React 공식 소스코드](https://github.com/facebook/react)
- [React Hooks API](https://react.dev/reference/react/hooks)
- [Render and Commit](https://react.dev/learn/render-and-commit)
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)

---

## 매주 진행 기록 (매주 아래 블록 복사)

> **운영 규칙:** 매주 시작 시 목표 1~3개를 정하고, 주말에 실제 완료 증거를 확인한 뒤 체크한다. 완료하지 않은 항목은 `[ ]` 그대로 둔다. 학습 진척과 GitHub 커밋은 별도로 판정한다. 회사 관련 기록에는 기밀·개인정보를 넣지 않는다.

### 2026-10-12 ~ 2026-10-18 · 1주차 (초기 계획)

**주간 목표**
- [ ] React 분석용 버전(태그/SHA) 확정, 원본 소스와 Playground 준비
- [ ] JSX → React Element와 `createRoot` → `render` 진입 경로 추적
- [ ] `notes/01-fundamentals/`에 근거 코드·실험 결과를 정리해 1회 커밋

**실행 기록**
- 학습 일자 / 시간: 
- 분석한 파일·함수: 
- 공식 문서 링크: 
- Playground 재현 코드 / 결과: 
- GitHub 커밋 링크: 
- 완료 목표: 0/3 (미확인, 실제 완료 후 수정)
- 이해도: 미평가 (A: 구현·설계 설명 / B: 흐름 설명 / C: 혼동 남음)
- 실무 이직 자산 1건 (문제 → 판단 → 구현 → 결과, 공개 가능한 수준): 
- 부족한 JS/React 개념: 
- 미해결 질문: 
- 다음 주 반드시 완료할 목표 (1~3개):
  - [ ] 
  - [ ] 
  - [ ] 

### YYYY-MM-DD ~ YYYY-MM-DD · N주차 (복사용 템플릿)

**이번 주 목표 (최대 3개)**
- [ ] 
- [ ] 
- [ ] 

**이번 주 회고**
- 목표 달성: 0/3 (미확인)
- 학습 일자 / 시간: 
- 완료한 분석 단계 / 체크리스트 항목: 
- 분석한 소스 경로 / 함수 호출 순서: 
- 공식 문서와 확인한 근거: 
- Playground 실험과 관찰 결과: 
- GitHub 커밋 링크 (`react-code-reading`): 
- 관련 JS 보충 기록 (`frontend-deep-dive`): 
- 면접 답변 기록 (`Frontend-Interview-Questions`): 
- 설명 수준: 미평가 / A / B / C
  - A: 실제 소스 근거로 동작과 설계 이유 설명 가능
  - B: 핵심 호출 흐름과 자료구조 설명 가능
  - C: 핵심 동작이나 이유에 혼동이 남음
- 회사에서 쌓은 이직 자산 (문제 → 판단 → 구현 → 결과): 
- 부족한 영역 / 미해결 질문: 
- 다음 주 목표 (반드시 끝낼 1~3개, 측정 가능한 기준 포함):
  - [ ] 
  - [ ] 
  - [ ] 

## 주간 누적 현황

| 주차 | 기간 | 핵심 주제 | 목표 달성 | 이해도 | 커밋 | 실무 사례 |
|---|---|---|---|---|---|---|
| 1 | 10/12~10/18 | 환경 구성·JSX·진입점 | 미확인 | 미평가 | 미확인 | 미기록 |
| 2 | 10/19~10/25 | 1주차 결과에 따라 결정 | - | - | - | - |

> 이후 매주 한 행을 추가한다. 실제 확인되지 않은 성과를 완료로 표시하지 않는다.
