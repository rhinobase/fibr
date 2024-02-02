import { createThread, useThread } from "@fibr/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, type FieldWrapperProps } from "../FieldWrapper";
import { InputWrapper, type InputWrapperProps } from "../InputWrapper";

export type TextInput = FieldWrapperProps<
  InputWrapperProps<{
    placeholder?: string;
    defaultValue?: string;
    inputType?: string;
  }>
>;

export function TextInput() {
  const {
    id,
    inputType = "text",
    defaultValue,
    placeholder,
  } = useThread<TextInput>();

  const { register } = useFormContext();

  return (
    <FieldWrapper>
      <InputWrapper>
        <InputField
          type={inputType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(id)}
        />
      </InputWrapper>
    </FieldWrapper>
  );
}

export const stringInput = createThread<TextInput>("string");
