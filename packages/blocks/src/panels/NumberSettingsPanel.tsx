import {
  CommonInputSettings,
  FieldWrapperSettings,
  SettingsPanelWrapper,
} from "./utils";

export function NumberSettingsPanel() {
  return (
    <SettingsPanelWrapper>
      <FieldWrapperSettings />
      <CommonInputSettings />
    </SettingsPanelWrapper>
  );
}
