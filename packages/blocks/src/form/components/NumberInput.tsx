import { InputField } from "@rafty/ui";
import { useField } from "duck-form";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, InputWrapper } from "../../utils/components";

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
  } = useField<NumberInput & { id: string }>();
  console.log("working");

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
