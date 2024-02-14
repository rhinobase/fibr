import { useThread } from "@fibr/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { eventHandler } from "@rafty/shared";
import { Button, InputField, Suffix, useBoolean } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import {
  FieldWrapper,
  InputWrapper,
  type FieldWrapperProps,
  type InputWrapperProps,
} from "../../utils";

export type PasswordInput = Omit<
  FieldWrapperProps<
    InputWrapperProps<{
      placeholder?: string;
      defaultValue?: string;
    }>
  >,
  "suffixIcon" | "suffixText"
>;

export function PasswordInput() {
  const [showPassword, toggle] = useBoolean(false);

  const Icon = showPassword ? EyeSlashIcon : EyeIcon;

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
    prefixIcon,
    prefixText,
    size,
  } = useThread<PasswordInput>();

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
    prefixIcon,
    prefixText,
    size,
  };

  const handler = eventHandler(() => toggle());

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <InputWrapper {...inputWrapperProps}>
        <InputField
          id={id}
          type={showPassword ? "text" : "password"}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register(id)}
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
