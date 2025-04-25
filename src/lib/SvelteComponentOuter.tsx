"use client";

import { useEffect, useRef } from "react";
import { Component } from "svelte";
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
    Object.entries(props).forEach(([key, value]) => {
      //@ts-ignore
      statefulPropsRef.current.value[key] = value;
    });
  }, [props]);

  return (
    <SvelteComponentMemoInner
      component={component}
      props={statefulPropsRef.current.value as unknown as T}
    />
  );
}

export default SvelteComponent;
