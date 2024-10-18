import type { Block, Config } from "@fibr/builder";
import { BsTextareaT } from "react-icons/bs";
import { LuTextCursorInput } from "react-icons/lu";
import { MdLink, MdOutlineKey, MdOutlineMailOutline } from "react-icons/md";
import { Div, Link, Paragraph, Span, Text } from "./components";
import {
  CommanSettings,
  LinkSettings,
  SettingsWrapper,
  TextSettings,
} from "./settings";

export const formConfig: Record<string, Config> = {
  div: {
    builder: Div,
    settings: () => (
      <SettingsWrapper>
        <CommanSettings />
      </SettingsWrapper>
    ),
  },
  p: {
    builder: Paragraph,
    settings: () => (
      <SettingsWrapper>
        <CommanSettings />
      </SettingsWrapper>
    ),
  },
  text: {
    builder: Text,
    settings: () => (
      <SettingsWrapper>
        <TextSettings />
      </SettingsWrapper>
    ),
  },
  span: {
    builder: Span,
    settings: () => (
      <SettingsWrapper>
        <CommanSettings />
      </SettingsWrapper>
    ),
  },
  a: {
    builder: Link,
    settings: () => (
      <SettingsWrapper>
        <LinkSettings />
      </SettingsWrapper>
    ),
  },
};

export const formBlocks: Record<string, Block[]> = {
  "Text Inputs": [
    {
      type: "div",
      label: "Div",
      icon: LuTextCursorInput,
      presets: {
        data: { className: ["px-1 py-3"] },
      },
    },
    {
      type: "span",
      label: "Span",
      icon: MdOutlineMailOutline,
      presets: {
        data: { className: ["px-1 py-3"] },
      },
    },
    {
      type: "p",
      label: "Paragraph",
      icon: MdLink,
      presets: {
        data: { className: ["px-1 py-3"] },
      },
    },
    {
      type: "a",
      label: "Link",
      icon: MdOutlineKey,
      presets: {
        data: { className: ["px-1 py-3"], link: "" },
      },
    },
    {
      type: "text",
      label: "Text",
      icon: BsTextareaT,
      presets: {
        data: { content: "Content here..." },
      },
    },
  ],
};
