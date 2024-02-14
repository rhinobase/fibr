import type { ReactNode } from "react";
import {
  Page,
  NumberInput,
  PasswordInput,
  StringInput,
  Textarea,
} from "./components";
import {
  CanvasSettings,
  NumberInputSettings,
  PasswordInputSettings,
  StringInputSettings,
  TextareaSettings,
} from "./settings";

export const pageConfig: Record<
  string,
  { builder: () => ReactNode; settings: () => ReactNode }
> = {
  page: {
    builder: Page,
    settings: CanvasSettings,
  },
  string: {
    builder: StringInput,
    settings: StringInputSettings,
  },
  password: {
    builder: PasswordInput,
    settings: PasswordInputSettings,
  },
  textarea: {
    builder: Textarea,
    settings: TextareaSettings,
  },
  number: {
    builder: NumberInput,
    settings: NumberInputSettings,
  },
};
