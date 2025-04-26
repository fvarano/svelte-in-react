# Next.js Example for Svelte in React

This example demonstrates how to use Svelte components within a Next.js React application using the `svelte-in-react` library.

## Features

- Next.js application with React and Svelte integration
- Counter component with shared state between React and Svelte
- Complete webpack configuration for Svelte support

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## How It Works

The example shows a counter component where:

1. The state (count) is managed in React using `useState`
2. The state is passed to a Svelte component as a prop
3. Both React and Svelte components can update the count

### Key Files

- `src/app/lib/components/Counter.svelte` - The Svelte counter component
- `src/app/lib/components/Counter.tsx` - The React component that uses the Svelte component
- `src/app/page.tsx` - The Next.js page that uses the Counter component
- `next.config.ts` - Configuration for Next.js with Svelte support

### Implementation Details

The React component uses the `useSvelteComponent` hook to convert the Svelte component into a React component:

```tsx
const SvelteCounter = useSvelteComponent(SvelteCounterComponent);
```

The Next.js configuration uses the `addSvelteBridge` helper to set up webpack for Svelte:

```ts
import { addSvelteBridge } from "svelte-in-react/webpack";

const nextConfig = {
  webpack: (config, context) => {
    addSvelteBridge(config, context);
    return config;
  },
};
```
