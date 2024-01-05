"use client";
import { useFibr } from "../providers";
import type { ThreadWithNameType } from "../types";

export function Thread(props: ThreadWithNameType) {
  const { components } = useFibr();

  const Comp = components[props.type];

  // No component found
  if (!Comp)
    return (
      <p>
        Component of type <kbd>{props.type}</kbd> for the component with name{" "}
        <kbd>{props.name}</kbd> doesn't exist!
      </p>
    );

  // Returning the component
  return <Comp {...props} />;
}
