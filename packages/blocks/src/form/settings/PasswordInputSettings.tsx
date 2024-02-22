import {
  CommonInputSettings,
  FieldWrapperSettings,
  SettingsPanelWrapper,
} from "./utils";

export function PasswordInputSettings() {
  return (
    <SettingsPanelWrapper>
      <FieldWrapperSettings />
      <CommonInputSettings />
    </SettingsPanelWrapper>
  );
}
