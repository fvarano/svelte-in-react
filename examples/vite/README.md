# Vite Example for Svelte in React

This example demonstrates how to use Svelte components within a Vite + React application using the `svelte-in-react` library.

## Features

- Vite + React + TypeScript setup
- Svelte 5 integration with runes support
- Counter component with shared state between React and Svelte

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open the local development server URL shown in your terminal to see the result.

## How It Works

The example shows a counter component where:

1. The state (count) is managed in React using `useState`
2. The state is passed to a Svelte component as a prop
3. Both React and Svelte can update the count independently

### Key Files

- `src/components/Counter.svelte` - The Svelte counter component
- `src/components/Counter.tsx` - The React component that uses the Svelte component
- `src/App.tsx` - The main React application that uses the Counter component
- `vite.config.ts` - Configuration for Vite with Svelte support

### Implementation Details

The React component uses the `useSvelteComponent` hook to convert the Svelte component into a React component:

```tsx
const SvelteCounterComponent = useSvelteComponent(SvelteCounter);
```

The Vite configuration uses the `@sveltejs/vite-plugin-svelte` plugin to handle Svelte files:

```ts
export default defineConfig({
	plugins: [react(), svelte()],
});
```
