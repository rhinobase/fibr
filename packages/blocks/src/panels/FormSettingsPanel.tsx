import { Label } from "@rafty/ui";
import { SettingInput, SettingsPanelWrapper } from "./utils";

export function FormSettingsPanel() {
  return (
    <SettingsPanelWrapper>
      <Label>Title</Label>
      <SettingInput name="title" />
    </SettingsPanelWrapper>
  );
}
