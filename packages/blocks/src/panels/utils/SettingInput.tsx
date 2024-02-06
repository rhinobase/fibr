import { InputField, classNames } from "@rafty/ui";
import { useFormContext } from "react-hook-form";

export type SettingInput = Omit<InputField, "name"> & { name: string };

export function SettingInput({
  size = "sm",
  className,
  ...props
}: SettingInput) {
  const { register } = useFormContext();

  return (
    <InputField
      size={size}
      {...props}
      {...register(props.name, {
        onBlur(event) {
          console.log(props.name, event);
        },
      })}
      className={classNames("col-span-2", className)}
    />
  );
}
