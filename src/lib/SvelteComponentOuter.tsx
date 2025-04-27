"use client";

import { useEffect, useRef } from "react";
import { type Component } from "svelte";
import { useStatefulProps } from "./stateful-props.svelte";
import SvelteComponentMemoInner from "./SvelteComponentInner";

function SvelteComponent<T extends Record<string, unknown>>({
	component,
	...props
}: {
	component: Component<T>;
} & T) {
	let statefulPropsRef = useRef(useStatefulProps(props));

	useEffect(() => {
		statefulPropsRef.current.update(props);
	}, [props]);

	return (
		<SvelteComponentMemoInner
			component={component}
			props={statefulPropsRef.current.value as unknown as T}
		/>
	);
}

export default SvelteComponent;
