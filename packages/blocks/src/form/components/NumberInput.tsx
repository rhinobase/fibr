import { useThread } from "@fibr/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import {
  FieldWrapper,
  InputWrapper,
  type FieldWrapperProps,
  type InputWrapperProps,
} from "../../utils";

export type NumberInput = FieldWrapperProps<
  InputWrapperProps<{
    placeholder?: string;
    defaultValue?: string;
  }>
>;

export function NumberInput() {
  const {
    id,
    defaultValue,
    placeholder,
    description,
    disabled,
    hidden,
    label,
    required,
    tooltip,
    size,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
  } = useThread<NumberInput>();

  const { register } = useFormContext();

  const fieldWrapperProps = {
    description,
    disabled,
    hidden,
    label,
    required,
    tooltip,
  };

  const inputWrapperProps = {
    size,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
  };

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <InputWrapper {...inputWrapperProps}>
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