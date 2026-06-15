# 01. JSX와  React Element

## 오늘의 질문

- <App />은 DOM일까?
- App 함수를 바로 실행하는 걸까?
- 아니면 React가 나중에 처리할 설명 객체일까?
- `<App />`은 `App()`을 바로 실행하는가?

## 실험 코드

```tsx
function App() {
  console.log("2. App 함수 실행");

  return <h1>Hello React</h1>;
}

const element = <App />;

console.log("1. element:", element);

export default App;
```

## 실행 전 예상
`const element = <App />`에서 `App()`이 바로 실행될줄 알았다.

이유: 리액트 내부에서 초기 돔을 뿌려줄떄 JSX 파일을 바로 호출해 해당 마크업을 먼저 뿌려줄줄 알았다.`console.log("1. element:", element);`는 걍 무시하거나 나중에 실행될줄 알았다.

## 관찰한 것
- `console.log("1. element:", element)`가 먼저 찍혔다.
- 그 다음 `console.log("2. App 함수 실행")`이 찍혔다.
- 따라서 `const element = <App />` 시점에 `App()` 함수 본문이 바로 실행된 것은 아니다.
- `App 함수 실행`이 두 번 찍힐 수도 있는데, 이건 개발 환경의 `StrictMode` 영향일 수 있다.

## 내가 이해한 것

`<App />`은 `App()`을 직접 호출하는 코드가 아니다.

`const element = <App />`는 대략 이런 의미에 가깝다.

```ts
const element = {
  type: App,
  props: {},
};
```

즉, `App` 함수 실행 결과를 넣는 것이 아니라,
`type`이 `App`인 React Element 값을 만든다.

`App` 함수 본문은 React가 `createRoot(...).render(<App />)` 이후 렌더링 과정에서 실행한다.

## 내가 이해한 것

JSX는 태그를 바로 DOM으로 만들어주는 코드가 아니다.

`<h1>Hello</h1>`은 실제 `document.createElement("h1")`을 바로 실행하는 것이 아니라,
React가 나중에 DOM을 만들 수 있도록 `type: "h1"`과 `props.children`을 가진 React Element 값을 만든다.

`<App />`도 `App()`을 바로 실행하는 것이 아니라,
`type: App`인 React Element 값을 만든다.

즉, JSX는 “실제 DOM 생성”이 아니라 “React에게 넘길 설명 객체 생성”에 가깝다.

-> JSX = DOM 생성 코드가 아니라 React Element 설명서 생성 코드

## 다음 의문점

- React Element 객체는 정확히 어떤 필드를 가지고 있는가?
- JSX는 Vite에서 정확히 어떤 코드로 변환되는가?
- `createRoot(...).render(<App />)`는 내부에서 어떤 순서로 실행되는가?

## 다음에 볼 것 1개

React Element의 실제 콘솔 출력 형태를 보고 `type`, `props`, `key`를 확인한다.

## 오늘의 한 줄
`<App />`은 App() 직접 호출이 아니라, type이 App인 React Element 값을 만드는 코드다.


---
## Day 2. React Element 실제 모양 관찰

## 오늘의 질문
React Element 객체에는 어떤 정보가 들어갈까?

## 실험 코드
```tsx
function App() {
  console.log("3. App 함수 실행");

  return <h1>Hello React</h1>;
}

const h1Element = <h1 className="title">Hello React</h1>;
const appElement = <App />;

console.log("1. h1Element:", h1Element);
console.log("2. appElement:", appElement);

export default App;
```


## 관찰한 것

### `h1Element`

```txt
  type:"h1"
  props: {
    children : "Hello React"
    className : "title"
  }
  key: null
  ref: null
```

### `appElement`

```txt
type: App 함수, function App () {...}
props: {}
key: null
ref: null
```

## 내가 이해한 것

`<h1 className="title">Hello React</h1>`은 실제 DOM을 바로 만드는 것이 아니라,
`type`이 `"h1"`인 React Element 값을 만든다.

`className`은 `props.className`에 들어간다.

`Hello React`는 `props.children`에 들어간다.

`<App />`은 `App()`을 바로 실행하는 것이 아니라,
`type`이 `App` 함수인 React Element 값을 만든다.

즉, React Element는 대략 이런 설명서 역할을 한다.

```ts
{
  type: "무엇을 만들지",
  props: "어떤 속성과 자식을 줄지",
  key: "리스트 비교용 식별자",
  ref: "DOM이나 컴포넌트 참조용 값"
}
```

## 아직 모르는 것

- `key`는 왜 `props` 안에 들어가지 않는가?
- `ref`는 왜 특별 취급되는가?
- React는 이 element를 받아서 언제 실제 DOM을 만드는가?

## 다음에 볼 것 1개

`createRoot(document.getElementById("root")).render(<App />)`에서 `render`가 이 React Element를 어떻게 받는지 본다.