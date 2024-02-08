import { createThread, useThread } from "@fibr/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, type FieldWrapperProps } from "../FieldWrapper";
import { InputWrapper, type InputWrapperProps } from "../InputWrapper";

export type NumberInput = FieldWrapperProps<
  InputWrapperProps<{
    placeholder?: string;
    defaultValue?: string;
  }>
>;

export function NumberInput() {
  const { id, defaultValue, placeholder } = useThread<NumberInput>();

  const { register } = useFormContext();

  return (
    <FieldWrapper>
      <InputWrapper>
        <InputField
          type="number"
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(id)}
        />
      </InputWrapper>
    </FieldWrapper>
  );
}

export const number = createThread<NumberInput>("number");
