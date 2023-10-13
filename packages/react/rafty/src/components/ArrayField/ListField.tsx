import { FArrayFieldType } from "@fibr/core";
import { ArrayFieldWrapper } from "./ArrayFieldWrapper";
import { RenderField, FieldProps } from "@fibr/react";

export function ListField({ name, field }: FieldProps<FArrayFieldType>) {
  return (
    <ArrayFieldWrapper name={name}>
      {({ index }) => (
        <RenderField name={`${name}.${index}`} field={field.of} />
      )}
    </ArrayFieldWrapper>
  );
}
