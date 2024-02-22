import { useThread } from "@fibr/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import {
  FieldWrapper,
  type FieldWrapperProps,
  InputWrapper,
  type InputWrapperProps,
} from "../../utils";

export type NumberInput = {
  data: FieldWrapperProps<
    InputWrapperProps<{
      placeholder?: string;
      defaultValue?: string;
    }>
  >;
};

export function NumberInput() {
  const {
    id,
    data: {
      defaultValue,
      placeholder,
      tooltip,
      description,
      disabled,
      hidden,
      label,
      required,
      size,
      prefixIcon,
      prefixText,
      suffixIcon,
      suffixText,
    },
  } = useThread<NumberInput>();

  const { register } = useFormContext();

  const fieldWrapperProps = {
    tooltip,
    description,
    disabled,
    hidden,
    label,
    required,
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
