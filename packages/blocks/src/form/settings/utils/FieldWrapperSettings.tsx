import { Label } from "@rafty/ui";
import { SettingInput } from "./SettingInput";
import { SettingSwitch } from "./SettingSwitch";

export function FieldWrapperSettings() {
  return (
    <>
      <Label>Label</Label>
      <SettingInput name="data.label" />
      <Label>Description</Label>
      <SettingInput name="data.description" />
      <Label>Required</Label>
      <SettingSwitch name="data.required" />
      <Label>Disabled</Label>
      <SettingSwitch name="data.disabled" />
      <Label>Tooltip</Label>
      <SettingInput name="data.tooltip" />
    </>
  );
}
