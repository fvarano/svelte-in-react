import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { useSvelteComponent } from "../src/lib/useSvelteComponent";
import type { Component } from "svelte";
import * as React from "react";
import "@testing-library/jest-dom";

// Mock the SvelteComponent import
vi.mock("../src/lib/SvelteComponent", () => {
	return {
		default: ({
			component,
			...props
		}: {
			component: Component<any>;
			[key: string]: any;
		}) => {
			// For testing, render a simple div that shows the component was rendered with props
			return (
				<div data-testid="svelte-component-mock">
					<div data-testid="component-name">
						{component.name || "MockSvelteComponent"}
					</div>
					<pre data-testid="component-props">
						{JSON.stringify(props, null, 2)}
					</pre>
				</div>
			);
		},
	};
});

// Mock a Svelte component
const MockSvelteCounter = {
	name: "MockSvelteCounter",
} as unknown as Component<{ count?: number; label?: string }>;

describe("useSvelteComponent", () => {
	beforeEach(() => {
		cleanup();
	});

	it("should return a React component that renders the Svelte component", () => {
		// Use the hook to create a React component from the Svelte component
		const Counter = useSvelteComponent(MockSvelteCounter);

		// Render the React component
		render(<Counter count={5} />);

		// Check that the Svelte component mock was rendered
		expect(screen.getByTestId("svelte-component-mock")).toBeInTheDocument();
		expect(screen.getByTestId("component-name")).toHaveTextContent(
			"MockSvelteCounter",
		);
	});

	it("should pass props to the Svelte component", () => {
		const Counter = useSvelteComponent(MockSvelteCounter);

		// Render with some props
		render(<Counter count={10} label="Counter" />);

		// Verify props were passed correctly
		const propsElement = screen.getByTestId("component-props");
		expect(propsElement).toBeInTheDocument();

		// Check that our props are in the rendered JSON
		expect(propsElement.textContent).toContain('"count": 10');
		expect(propsElement.textContent).toContain('"label": "Counter"');
	});

	it("should update when props change", () => {
		// Create a component that will update props
		const TestComponent = () => {
			const [count, setCount] = React.useState(5);
			const Counter = useSvelteComponent(MockSvelteCounter);

			React.useEffect(() => {
				// Update the count after render
				setTimeout(() => setCount(15), 10);
			}, []);

			return <Counter count={count} />;
		};

		const { rerender } = render(<TestComponent />);

		// Initial render should have count=5
		expect(screen.getByTestId("component-props").textContent).toContain(
			'"count": 5',
		);

		// Force a rerender to simulate the state update
		rerender(<TestComponent />);
		waitFor(() => {
			expect(screen.getByTestId("component-props").textContent).toContain(
				'"count": 15',
			);
		});
	});

	it("should work with different Svelte components", () => {
		// Create another mock Svelte component
		const AnotherMockComponent = {
			name: "AnotherMockComponent",
		} as unknown as Component<{ message: string }>;

		// Create React components from different Svelte components
		const Counter = useSvelteComponent(MockSvelteCounter);
		const Another = useSvelteComponent(AnotherMockComponent);

		// Render both components
		const { unmount } = render(<Counter count={5} />);
		expect(screen.getByTestId("component-name")).toHaveTextContent(
			"MockSvelteCounter",
		);

		unmount();

		render(<Another message="Hello" />);
		expect(screen.getByTestId("component-name")).toHaveTextContent(
			"AnotherMockComponent",
		);
		expect(screen.getByTestId("component-props").textContent).toContain(
			'"message": "Hello"',
		);
	});
});
