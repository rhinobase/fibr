import { useThread } from "@fibr/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, InputWrapper } from "../../utils";

export type NumberInput = {
  data: {
    placeholder?: string;
    defaultValue?: string;
  };
};

export function NumberInput() {
  const {
    id,
    data: { defaultValue, placeholder },
  } = useThread<NumberInput>();

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
