"use client";

import { createElement, type JSX, memo, useEffect, useRef } from "react";
import { type Component, hydrate } from "svelte";
import { render } from "svelte/server";
import { useIsServer } from "./isServer";

const isServer = useIsServer();

const SvelteComponent = memo(
	<T extends Record<string, unknown>>({
		component,
		props,
	}: {
		component: Component<T>;
		props: T;
	}) => {
		let instance;
		let instanceRef = null;
		const elementRef = useRef<HTMLDivElement>(null);

		if (isServer) {
			instance = render(component, {
				props,
			});
		}

		useEffect(() => {
			if (elementRef.current) {
				instanceRef = hydrate(component, {
					props,
					target: elementRef.current,
				});
			}
		});

		return createElement("div", {
			style: { display: "contents" },
			ref: elementRef,
			suppressHydrationWarning: true,
			dangerouslySetInnerHTML: {
				__html: isServer ? instance!.body : "",
			},
		});
	},
	() => {
		if (import.meta.webpackHot) {
			return false;
		}
		return true;
	},
) as <T extends Record<string, unknown>>({
	component,
	props,
}: {
	component: Component<T>;
	props: T;
}) => JSX.Element;

export default SvelteComponent;
