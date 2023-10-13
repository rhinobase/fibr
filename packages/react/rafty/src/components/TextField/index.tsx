import { Textarea, classNames } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FTextFieldType } from "@fibr/core";
import { FieldWrapper } from "../FieldWrapper";
import { FieldProps } from "@fibr/react";

export function TextField({ name, field }: FieldProps<FTextFieldType>) {
  const { register } = useFormContext();

  const readOnly = field.readOnly as boolean | undefined;
  const required = field.required as boolean | undefined;

  return (
    <FieldWrapper
      required={required}
      name={name}
      label={field.label}
      description={field.description}
      className={classNames(field.hidden ? "hidden" : "flex")}
    >
      <Textarea
        {...register(name)}
        placeholder={field.placeholder as string | undefined}
        readOnly={readOnly}
      />
    </FieldWrapper>
  );
}
