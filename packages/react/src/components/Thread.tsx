"use client";
import { useFibr } from "../providers";
import type { ThreadType } from "../types";

export type Thread = {
  name: string;
} & ThreadType;

export function Thread(props: Thread) {
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
