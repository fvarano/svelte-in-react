import "./App.css";
import Counter from "./components/Counter2.tsx";

function App() {
	return (
		<>
			<h1>Svelte in React - Vite Example</h1>
			<div className="svelte-component">
				<Counter />
			</div>
		</>
	);
}

export default App;
