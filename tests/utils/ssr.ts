import type { ReactElement } from "react";
import { renderToString } from "react-dom/server";

export function renderSSR(ui: ReactElement) {
	return renderToString(ui);
}
