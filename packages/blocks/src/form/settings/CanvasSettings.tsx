import { Label } from "@rafty/ui";
import { SettingInput, SettingsPanelWrapper } from "../../utils/settings";

export function CanvasSettings() {
  return (
    <SettingsPanelWrapper>
      <Label>Title</Label>
      <SettingInput name="data.title" />
    </SettingsPanelWrapper>
  );
}
