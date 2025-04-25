import { Component } from "svelte";

export async function reactifyServer<T extends Record<string, any>>(
  svelteComponent: () => Promise<Component<T>>,
) {
  const component = await svelteComponent();
  console.log("function name: ", component.name);
  return (props: T) => {
    return <div></div>;
  };
}
