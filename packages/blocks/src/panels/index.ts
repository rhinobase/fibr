import { FormSettingsPanel } from "./FormSettingsPanel";
import { NumberSettingsPanel } from "./NumberSettingsPanel";
import { StringSettingsPanel } from "./PasswordSettingsPanel";
import { PasswordSettingsPanel } from "./StringSettingsPanel";
import { TextareaSettingsPanel } from "./TextareaSettingsPanel";

export const settings = {
  form: FormSettingsPanel,
  string: StringSettingsPanel,
  password: PasswordSettingsPanel,
  textarea: TextareaSettingsPanel,
  number: NumberSettingsPanel,
};
