import {
  SettingsPanelWrapper,
  CommonInputSettings,
  FieldWrapperSettings,
} from "./utils";

export function TextareaSettingsPanel() {
  return (
    <SettingsPanelWrapper>
      <FieldWrapperSettings />
      <CommonInputSettings />
    </SettingsPanelWrapper>
  );
}
