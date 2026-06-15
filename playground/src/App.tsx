function App() {
	console.log("3. App 함수 실행")

	return <h1>Hello React</h1>
}

const h1Element = <h1 className="title">Hello React</h1>
const appElement = <App />

console.log("1. h1Element:", h1Element)
console.log("2. appElement:", appElement)

export default App
