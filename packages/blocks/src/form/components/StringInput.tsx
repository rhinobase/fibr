import { useThread } from "@fibr/react";
import { InputField, mergeRefs } from "@rafty/ui";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
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
  const ref = useRef<HTMLInputElement>(null);
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

  const { control } = useFormContext();

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
        <Controller
          name={id}
          control={control}
          render={({ field: { ref: formRef, ...props } }) => (
            <InputField
              {...props}
              id={id}
              type={inputType}
              placeholder={placeholder}
              ref={mergeRefs(formRef, ref)}
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              defaultValue={defaultValue}
            />
          )}
        />
      </InputWrapper>
    </FieldWrapper>
  );
}
