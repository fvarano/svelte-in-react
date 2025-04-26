# Svelte in React

A lightweight library that enables using Svelte components within React applications.

## Features

- 🔄 Use Svelte components directly in React applications
- 🌐 Works with both client-side and server-side rendering
- ⚡ Supports Next.js and other React frameworks
- 🔥 Hot module replacement support for development
- 🧩 Simple API for converting Svelte components to React components

> **Note:** This library is designed for client components only. When using with React Server Components (RSC), you must mark your components with `"use client"` directive.

## Installation

```bash
# Install the main package
npm install svelte-in-react

# Install peer dependencies if you don't already have them
npm install -D svelte@^5.0.0

# Bundler specific dependencies
# Webpack (Next.js)
npm install -D svelte-loader@^3.1.0
# Vite
npm install -D @sveltejs/vite-plugin-svelte
```

## Usage

### Basic Usage

```jsx
// Note the "use client" directive is required when using React Server Components
"use client";

import { useSvelteComponent } from "svelte-in-react";
import MyComponent from "./MyComponent.svelte";

// Convert a Svelte component to a React component
const ReactComponent = useSvelteComponent(MyComponent);

// Use it like any other React component
function App() {
	return <ReactComponent prop1="value1" prop2="value2" />;
}
```

### Webpack Configuration

For projects using Webpack (including Next.js), you need to configure your bundler to handle Svelte files:

```js
// next.config.js
import { addSvelteBridge } from "svelte-in-react/webpack";

const nextConfig = {
	webpack: (config, context) => {
		addSvelteBridge(config, context);
		return config;
	},
};

export default nextConfig;
```

You can optionally specify a custom working directory:

```js
addSvelteBridge(config, context, {
	cwd: path.join(__dirname, "packages/react-app"),
});
```

> **Note:** When using with webpack, make sure you have installed `svelte-loader` as mentioned in the installation section.

### Vite Configuration

For projects using Vite, you need to configure your bundler to handle Svelte files:

```js
// vite.config.js or vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	plugins: [react(), svelte()],
});
```

> **Note:** When using with Vite, make sure you have installed `@sveltejs/vite-plugin-svelte` as a dev dependency: `npm install -D @sveltejs/vite-plugin-svelte`.

## How It Works

Svelte in React uses a dual-rendering approach:

1. For server-side rendering, it uses Svelte's server-side rendering capabilities
2. For client-side, it hydrates the Svelte component within a React wrapper
3. Props are passed from React to Svelte with automatic updates

## Requirements

### Peer Dependencies

- React ≥ 17.0.0
- React DOM ≥ 17.0.0
- Svelte ≥ 5.0.0
- svelte-loader ≥ 3.1.0 (for webpack integration, optional, dev dependency)
- Next.js ≥ 12.0.0 (optional)

These dependencies are not bundled with this package to avoid version conflicts and reduce package size. You need to install them separately in your project.

## Examples

### Passing Props and Callbacks

In Svelte component:

```svelte
<script>
	// Counter.svelte

	// Define the prop
	let { onIncrement = (count) => {} } = $props();

	let count = $state(0);

	function increment() {
		count++;
		// Call the callback directly
		onIncrement(count);
	}
</script>

<button onclick={increment}>Count: {count}</button>
```

In React component:

```jsx
// Note the "use client" directive is required when using React Server Components
"use client";

import { useSvelteComponent } from "svelte-in-react";
import Counter from "./Counter.svelte";

const ReactCounter = useSvelteComponent(Counter);

function App() {
	// Callback is passed as a regular prop
	const handleIncrement = (count) => {
		console.log("Counter incremented to:", count);
	};

	return <ReactCounter onIncrement={handleIncrement} initialValue={5} />;
}
```

### Complete Examples

For more comprehensive examples, check out the [examples](./examples) directory in this repository:

- **[Next.js Example](./examples/next)**: A complete Next.js application demonstrating how to use Svelte components in a React application with shared state.
- **[Vite Example](./examples/vite)**: A Vite + React + TypeScript application showing how to integrate Svelte components with proper bundling configuration.

## License

MIT
