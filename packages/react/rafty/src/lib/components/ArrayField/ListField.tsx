import { FArrayFieldType } from "@fiber/core";
import { ArrayFieldWrapper } from "./ArrayFieldWrapper";
import { RenderField, FieldProps } from "@fiber/react";

export function ListField({ name, field }: FieldProps<FArrayFieldType>) {
  return (
    <ArrayFieldWrapper name={name}>
      {({ index }) => (
        <RenderField name={`${name}.${index}`} field={field.of} />
      )}
    </ArrayFieldWrapper>
  );
}
