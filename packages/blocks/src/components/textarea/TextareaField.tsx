import { createThread, useThread } from "@fibr/react";
import { Textarea } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, type FieldWrapperProps } from "../FieldWrapper";

export type TextareaField = FieldWrapperProps<{
  placeholder?: string;
  defaultValue?: string;
}>;

export function TextareaField() {
  const { id, defaultValue, placeholder } = useThread<TextareaField>();
  const { register } = useFormContext();

  return (
    <FieldWrapper>
      <Textarea
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(id)}
      />
    </FieldWrapper>
  );
}

export const textarea = createThread<TextareaField>("textarea");
