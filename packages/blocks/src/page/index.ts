import { Block, Config } from "@fibr/shared";
import { BsBraces, BsTextareaT } from "react-icons/bs";
import { LuTextCursorInput } from "react-icons/lu";
import { MdLink, MdOutlineKey, MdOutlineMailOutline } from "react-icons/md";
import type { Node } from "reactflow";
import { Page } from "./components";
import { PageSettings } from "./settings";
import {
  NumberInput,
  ObjectField,
  PasswordInput,
  StringInput,
  Textarea,
} from "../form/components";
import {
  NumberInputSettings,
  ObjectSettings,
  PasswordInputSettings,
  StringInputSettings,
  TextareaSettings,
} from "../form/settings";

export const pageConfig: Record<string, Config> = {
  page: {
    builder: Page,
    settings: PageSettings,
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
  object: {
    builder: ObjectField,
    settings: ObjectSettings,
  },
};

export const pageBlocks: Record<string, Block<Partial<Node>>[]> = {
  "Text Inputs": [
    {
      type: "string",
      label: "Text Input",
      icon: LuTextCursorInput,
      presets: {
        data: { label: "Label", description: "Description" },
      },
    },
    {
      type: "string",
      label: "Email",
      icon: MdOutlineMailOutline,
      presets: {
        data: {
          inputType: "email",
          label: "Label",
          description: "Description",
          prefixIcon: "envelope",
        },
      },
    },
    {
      type: "string",
      label: "url",
      icon: MdLink,
      presets: {
        data: { inputType: "url", label: "Label", description: "Description" },
      },
    },
    {
      type: "password",
      label: "password",
      icon: MdOutlineKey,
      presets: {
        data: { label: "Label", description: "Description" },
      },
    },
    {
      type: "textarea",
      label: "Textarea",
      icon: BsTextareaT,
      presets: {
        data: { label: "Label", description: "Description" },
      },
    },
  ],
  "Number Inputs": [
    {
      type: "number",
      label: "Number Input",
      icon: LuTextCursorInput,
      presets: {
        data: {
          inputType: "number",
          label: "Label",
          description: "Description",
        },
      },
    },
  ],
  "Nested Object": [
    {
      type: "object",
      label: "Object Group",
      icon: BsBraces,
      presets: {
        data: {
          label: "Label",
          description: "Description",
        },
      },
    },
  ],
};
