import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter.tsx";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Svelte in React - Vite Example</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					React count is {count}
				</button>
			</div>
			<div className="svelte-component">
				<Counter initialCount={count} />
			</div>
		</>
	);
}

export default App;
