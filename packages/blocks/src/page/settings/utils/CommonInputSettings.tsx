import { Label } from "@rafty/ui";
import { SettingInput } from "./SettingInput";

export function CommonInputSettings() {
  return (
    <>
      <Label>Placeholder</Label>
      <SettingInput name="placeholder" />
      <Label>Default Value</Label>
      <SettingInput name="defaultValues" />
    </>
  );
}
