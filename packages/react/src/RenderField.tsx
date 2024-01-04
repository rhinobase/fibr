"use client";
import { useFibr } from "./providers";
import { FFieldType } from "./types";

export type RenderField = {
  name: string;
} & FFieldType;

export function RenderField(props: RenderField) {
  const { components } = useFibr();

  const Field = components[props.type];

  // No component found
  if (!Field)
    return (
      <p>
        Field type of <kbd>{props.type}</kbd> for the field with name{" "}
        <kbd>{props.name}</kbd> doesn't exist!
      </p>
    );

  // Returning the component
  return <Field {...props} />;
}
