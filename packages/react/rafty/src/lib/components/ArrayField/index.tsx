import { FArrayFieldType } from "@fiber/core";
import { FieldProps } from "@fiber/react";
import { classNames } from "@rafty/ui";
import { FieldWrapper } from "../FieldWrapper";
import { ListField } from "./ListField";

export function ArrayFields({ name, field }: FieldProps<FArrayFieldType>) {
  const required = field.required as boolean | undefined;

  return (
    <FieldWrapper
      required={required}
      name={name}
      label={field.label}
      description={field.description}
      className={classNames(field.hidden ? "hidden" : "flex")}
    >
      <ListField name={name} field={field} />
    </FieldWrapper>
  );
}
