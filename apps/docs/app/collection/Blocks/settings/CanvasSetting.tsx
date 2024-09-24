import { Label } from "@rafty/ui";
import { SettingInput } from "./utils";
import { SettingsPanelWrapper } from "./utils/SettingsPanelWrapper";

export function CanvasSettings() {
  return (
    <SettingsPanelWrapper>
      <Label>Title</Label>
      <SettingInput name="label" />
    </SettingsPanelWrapper>
  );
}
