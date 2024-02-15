import { useThread } from "@fibr/react";
import { Textarea as TextareaField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, type FieldWrapperProps } from "../../utils";

export type Textarea = FieldWrapperProps<{
  placeholder?: string;
  defaultValue?: string;
}>;

export function Textarea() {
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
  } = useThread<Textarea>();

  const { register } = useFormContext();

  const fieldWrapperProps = {
    description,
    disabled,
    hidden,
    label,
    required,
    tooltip,
  };

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <TextareaField
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
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
    </FieldWrapper>
  );
}
