import { InputField } from "@rafty/ui";
import { useField } from "duck-form";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, InputWrapper } from "../../utils/components";

export type StringInput = {
  data: {
    inputType?: string;
    placeholder?: string;
    defaultValue?: string;
  };
};

export function StringInput() {
  const {
    id,
    data: { defaultValue, placeholder, inputType = "text" },
  } = useField<StringInput & { id: string }>();

  const { register } = useFormContext();

  return (
    <FieldWrapper>
      <InputWrapper>
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
