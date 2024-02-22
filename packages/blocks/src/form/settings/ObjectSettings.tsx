import { Label } from "@rafty/ui";
import { SettingInput, SettingsPanelWrapper } from "./utils";

export function ObjectSettings() {
  return (
    <SettingsPanelWrapper>
      <Label>Label</Label>
      <SettingInput name="data.label" />
      <Label>Description</Label>
      <SettingInput name="data.description" />
    </SettingsPanelWrapper>
  );
}
