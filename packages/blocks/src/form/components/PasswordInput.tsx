import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  eventHandler,
  InputField,
  Suffix,
  useBoolean,
} from "@rafty/ui";
import { useField } from "duck-form";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, InputWrapper } from "../../utils/components";

export type PasswordInput = {
  data: {
    placeholder?: string;
    defaultValue?: string;
  };
};

export function PasswordInput() {
  const [showPassword, toggle] = useBoolean(false);

  const Icon = showPassword ? EyeSlashIcon : EyeIcon;

  const {
    id,
    data: { defaultValue, placeholder },
  } = useField<PasswordInput & { id: string }>();

  const { register } = useFormContext();

  const handler = eventHandler(() => toggle());

  return (
    <FieldWrapper>
      <InputWrapper>
        <InputField
          id={id}
          type={showPassword ? "text" : "password"}
          defaultValue={defaultValue}
          placeholder={placeholder}
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
        <Suffix className="pointer-events-auto">
          <Button
            type="button"
            size="icon"
            aria-label="show and hide password"
            variant="ghost"
            onPointerDown={handler}
            onKeyDown={handler}
            className="rounded p-1"
          >
            <Icon className="size-4 stroke-2" />
          </Button>
        </Suffix>
      </InputWrapper>
    </FieldWrapper>
  );
}
