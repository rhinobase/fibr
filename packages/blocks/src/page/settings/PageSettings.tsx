import { Label } from "@rafty/ui";
import { SettingInput, SettingsPanelWrapper } from "../../utils/settings";

export function PageSettings() {
  return (
    <SettingsPanelWrapper>
      <Label>Title</Label>
      <SettingInput name="title" />
    </SettingsPanelWrapper>
  );
}
