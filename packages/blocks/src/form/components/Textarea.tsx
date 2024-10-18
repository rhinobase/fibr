import { Textarea as TextareaField } from "@rafty/ui";
import { useField } from "duck-form";
import { useFormContext } from "react-hook-form";
import { FieldWrapper } from "../../utils/components";

export type Textarea = {
  data: {
    placeholder?: string;
    defaultValue?: string;
  };
};

export function Textarea() {
  const {
    id,
    data: { defaultValue, placeholder },
  } = useField<Textarea & { id: string }>();

  const { register } = useFormContext();

  return (
    <FieldWrapper>
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
