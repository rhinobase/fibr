import {
  CommonInputSettings,
  FieldWrapperSettings,
  SettingsPanelWrapper,
} from "./utils";

export function NumberInputSettings() {
  return (
    <SettingsPanelWrapper>
      <FieldWrapperSettings />
      <CommonInputSettings />
    </SettingsPanelWrapper>
  );
}
