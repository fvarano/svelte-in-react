import Counter from "./lib/components/Counter";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Svelte in React - Next.js Example</h1>
      <div className="p-4 border rounded-lg shadow-md">
        <Counter />
      </div>
    </div>
  );
}
