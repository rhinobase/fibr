import { useThread } from "@fibr/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, type FieldWrapperProps } from "../../utils/FieldWrapper";
import { InputWrapper, type InputWrapperProps } from "../../utils/InputWrapper";

export type StringInput = FieldWrapperProps<
  InputWrapperProps<{
    inputType?: string;
    placeholder?: string;
    defaultValue?: string;
  }>
>;

export function StringInput() {
  const {
    id,
    defaultValue,
    placeholder,
    inputType = "text",
  } = useThread<StringInput>();

  const { register } = useFormContext();

  return (
    <FieldWrapper>
      <InputWrapper>
        <InputField
          type={inputType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          id={id}
          {...register(id)}
        />
      </InputWrapper>
    </FieldWrapper>
  );
}
