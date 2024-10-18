import { Label, TagField } from "@rafty/ui";
import { Controller, useFormContext } from "react-hook-form";

export function CommanSettings() {
  const { control } = useFormContext();

  return (
    <>
      <Label>Tailwind Classes</Label>
      <Controller
        name="data.className"
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <TagField {...props} onValueChange={({ value }) => onChange(value)} />
        )}
      />
    </>
  );
}
