import { InputField, classNames } from "@rafty/ui";
import { FieldWrapper } from "../FieldWrapper";
import { useFormContext } from "react-hook-form";
import { FDateTimeFieldType } from "@fibr/core";
import { FieldProps } from "@fibr/react";

export function DatetimeField({ name, field }: FieldProps<FDateTimeFieldType>) {
  const { register } = useFormContext();

  const readOnly = field.readOnly as boolean | undefined;

  return (
    <FieldWrapper
      name={name}
      label={field.label}
      description={field.description}
      className={classNames(field.hidden ? "hidden" : "flex")}
      required={field.required as boolean | undefined}
    >
      <InputField
        {...register(name, { valueAsDate: true })}
        type="datetime-local"
        readOnly={readOnly}
      />
    </FieldWrapper>
  );
}
