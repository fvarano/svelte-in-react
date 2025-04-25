"use client";

import { createElement, JSX, memo, useEffect, useRef } from "react";
import { Component, hydrate } from "svelte";
import { render } from "svelte/server";

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

    if (typeof window === "undefined") {
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
        __html: typeof window === "undefined" ? instance!.body : "",
      },
    });
  },
  () => {
    if (import.meta.webpackHot) {
      return false;
    }
    return true;
  }
) as <T extends Record<string, unknown>>({
  component,
  props,
}: {
  component: Component<T>;
  props: T;
}) => JSX.Element;

export default SvelteComponent;
