"use client";

import { Component } from "svelte";
import SvelteComponent from "./SvelteComponent";

export function useSvelteComponent<T extends Record<string, any>>(
  svelteComponent: Component<T>
) {
  return (props: T) => (
    <SvelteComponent component={svelteComponent} {...props} />
  );
}
