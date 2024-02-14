import {
  CommonInputSettings,
  FieldWrapperSettings,
  SettingsPanelWrapper,
} from "./utils";

export function TextareaSettings() {
  return (
    <SettingsPanelWrapper>
      <FieldWrapperSettings />
      <CommonInputSettings />
    </SettingsPanelWrapper>
  );
}
