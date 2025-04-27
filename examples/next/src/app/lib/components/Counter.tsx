"use client";

import { useState } from "react";
import SvelteCounterComponent from "./Counter.svelte";
import { useSvelteComponent } from "svelte-in-react";

const SvelteCounter = useSvelteComponent(SvelteCounterComponent);

function Counter() {
	const [count, setCount] = useState(5);

	return (
		<>
			<span>React count: {count}</span>
			<button onClick={() => setCount((count) => count + 1)}>Increment</button>
			<SvelteCounter count={count}></SvelteCounter>
		</>
	);
}

export default Counter;
