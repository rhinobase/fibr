import { Switch, classNames } from "@rafty/ui";
import { Controller, useFormContext } from "react-hook-form";

export type SettingSwitch = Omit<Switch, "name"> & { name: string };

export function SettingSwitch({
  size = "sm",
  className,
  ...props
}: SettingSwitch) {
  const { control } = useFormContext();

  return (
    <div
      className={classNames(
        "col-span-2 flex w-full flex-row-reverse",
        className,
      )}
    >
      <Controller
        name={props.name}
        control={control}
        render={({
          field: { value, onChange, onBlur, name, ref, disabled },
        }) => (
          <Switch
            size={size}
            name={name}
            checked={value}
            onCheckedChange={onChange}
            onBlur={onBlur}
            isDisabled={disabled}
          />
        )}
      />
    </div>
  );
}
