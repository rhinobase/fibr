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
import { Block } from "@fibr/shared";
import { BsTextareaT } from "react-icons/bs";
import { LuTextCursorInput } from "react-icons/lu";
import { MdOutlineMailOutline, MdLink, MdOutlineKey } from "react-icons/md";
import type { Node } from "reactflow";

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
};
