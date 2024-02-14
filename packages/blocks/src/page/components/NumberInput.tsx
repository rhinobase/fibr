import { useThread } from "@fibr/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, type FieldWrapperProps } from "../../utils/FieldWrapper";
import { InputWrapper, type InputWrapperProps } from "../../utils/InputWrapper";

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
          id={id}
          type="number"
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(id)}
        />
      </InputWrapper>
    </FieldWrapper>
  );
}
