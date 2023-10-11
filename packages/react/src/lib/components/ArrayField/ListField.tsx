import { FArrayFieldType } from "@fiber/core";
import { ArrayFieldWrapper } from "./ArrayFieldWrapper";
import { RenderField } from "../../RenderField";
import { FieldsType } from "../../types";

export function ListField({ name, field }: FieldsType<FArrayFieldType>) {
  return (
    <ArrayFieldWrapper name={name}>
      {({ index }) => (
        <RenderField name={`${name}.${index}`} field={field.of} />
      )}
    </ArrayFieldWrapper>
  );
}
