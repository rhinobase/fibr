import { useThread } from "@fibr/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import {
  FieldWrapper,
  InputWrapper,
  type FieldWrapperProps,
  type InputWrapperProps,
} from "../../utils";

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
  } = useThread<StringInput>();

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
          type={inputType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete="off"
          {...register(id)}
          onPointerDownCapture={(event) => {
            event.stopPropagation();
          }}
          onKeyDownCapture={(event) => {
            event.stopPropagation();
          }}
          onClickCapture={(event) => {
            event.stopPropagation();
          }}
        />
      </InputWrapper>
    </FieldWrapper>
  );
}
