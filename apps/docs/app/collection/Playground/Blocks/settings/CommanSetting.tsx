import { Label } from "@rafty/ui";
import { SettingInput, SettingSwitch, SettingsPanelWrapper } from "./utils";

export function CommanSetting() {
  return (
    <SettingsPanelWrapper>
      <Label>Label</Label>
      <SettingInput name="label" />
      <Label>Description</Label>
      <SettingInput name="description" />
      <Label>Required</Label>
      <SettingSwitch name="required" />
    </SettingsPanelWrapper>
  );
}
