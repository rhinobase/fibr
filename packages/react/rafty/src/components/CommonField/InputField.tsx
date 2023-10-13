import { InputField as Input } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FStringFieldType } from "@fibr/core";
import { FieldProps } from "@fibr/react";

export function InputField({ name, field }: FieldProps<FStringFieldType>) {
  const { register } = useFormContext();
  const isNumber = field.type === "number";

  return (
    <Input
      {...register(name, { valueAsNumber: isNumber })}
      type={isNumber ? "number" : "text"}
      placeholder={field.placeholder as string | undefined}
      readOnly={field.readOnly as boolean | undefined}
    />
  );
}