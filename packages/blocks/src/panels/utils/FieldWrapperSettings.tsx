import { Label } from "@rafty/ui";
import { SettingInput } from "./SettingInput";
import { SettingSwitch } from "./SettingSwitch";

export function FieldWrapperSettings() {
  return (
    <>
      <Label>Label</Label>
      <SettingInput name="label" />
      <Label>Description</Label>
      <SettingInput name="description" />
      <Label>Required</Label>
      <SettingSwitch name="required" />
      <Label>Disabled</Label>
      <SettingSwitch name="disabled" />
      <Label>Hidden</Label>
      <SettingSwitch name="hidden" />
      <Label>Tooltip</Label>
      <SettingInput name="tooltip" />
    </>
  );
}
