import {
  CommonInputSettings,
  FieldWrapperSettings,
  SettingsPanelWrapper,
} from "./utils";

export function StringInputSettings() {
  return (
    <SettingsPanelWrapper>
      <FieldWrapperSettings />
      <CommonInputSettings />
    </SettingsPanelWrapper>
  );
}
