import { useThread } from "@fibr/react";
import { Textarea as TextareaField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, type FieldWrapperProps } from "../../utils/FieldWrapper";

export type Textarea = FieldWrapperProps<{
  placeholder?: string;
  defaultValue?: string;
}>;

export function Textarea() {
  const { id, defaultValue, placeholder } = useThread<Textarea>();
  const { register } = useFormContext();

  return (
    <FieldWrapper>
      <TextareaField
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(id)}
      />
    </FieldWrapper>
  );
}
