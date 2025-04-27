/**
 * @vitest-environment node
 */

import { describe, it, expect, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { useSvelteComponent } from "../src/lib/useSvelteComponent";
import SvelteComponent from "./fixtures/TestComponent.svelte";
import { renderSSR } from "./utils/ssr";

describe("useSvelteComponentSSR", () => {
	beforeEach(() => {
		cleanup();
	});

	it("should return a React component that renders the Svelte component", () => {
		// Use the hook to create a React component from the Svelte component
		const Counter = useSvelteComponent(SvelteComponent);

		// Render the React component
		const rendered = renderSSR(<Counter count={5} />);

		// Check that the Svelte component was rendered
		expect(rendered).toContain("Count: 5");
		expect(rendered).toContain("Hello from Svelte");
	});
});
