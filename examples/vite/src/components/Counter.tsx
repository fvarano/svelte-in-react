import { useSvelteComponent } from 'svelte-in-react';
import SvelteCounter from './Counter.svelte';

interface CounterProps {
  initialCount: number;
}

// Convert the Svelte component to a React component
const Counter = ({ initialCount }: CounterProps) => {
  const SvelteCounterComponent = useSvelteComponent(SvelteCounter);
  
  return <SvelteCounterComponent initialCount={initialCount} />;
};

export default Counter;
