import {
	render as rtlRender,
	type RenderOptions,
} from "@testing-library/react";
import type { ReactElement } from "react";

// Custom render function that includes any global providers if needed
function render(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
	return rtlRender(ui, { ...options });
}

// Re-export everything from testing-library
export * from "@testing-library/react";
export { render };
