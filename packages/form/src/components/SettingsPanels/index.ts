import { DividerSettingsPanel } from "./DividerSettingsPanel";
import { ImageSettingsPanel } from "./ImageSettingsPanel";
import { TextInputSettingsPanel } from "./TextInputSettingsPanel";
import { TextSettingsPanel } from "./TextSettingsPanel";
import { FormSettingsPanel } from "./FormSettingsPanel";

export const settingsPanel = {
  divider: DividerSettingsPanel,
  image: ImageSettingsPanel,
  text: TextSettingsPanel,
  string: TextInputSettingsPanel,
  form: FormSettingsPanel,
};
