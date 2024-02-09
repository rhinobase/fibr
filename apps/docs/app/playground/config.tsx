/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { plugin, pluginNode, settings } from "@fibr/blocks";
import { type Block } from "@fibr/shared";
import { type ReactNode } from "react";
import { BsTextareaT } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import {
  LuGitCommit,
  LuGitFork,
  LuGitPullRequestClosed,
  LuGitPullRequestDraft,
  LuTextCursorInput,
} from "react-icons/lu";
import { MdLink, MdOutlineKey, MdOutlineMailOutline } from "react-icons/md";

export const WORKFLOW_CONFIG: Record<
  string,
  { builder: () => ReactNode; settings: () => ReactNode }
> = {
  start: {
    builder: pluginNode.start,
    settings: settings.form,
  },
  transit: {
    builder: pluginNode.transit,
    settings: settings.form,
  },
  condition: {
    builder: pluginNode.condition,
    settings: settings.form,
  },
  end: {
    builder: pluginNode.end,
    settings: settings.form,
  },
};

export const WORKFLOW_BLOCKS: Record<string, Block[]> = {
  Basic: [
    {
      type: "start",
      label: "Start",
      icon: LuGitPullRequestDraft,
    },
    {
      type: "transit",
      label: "Transit",
      icon: LuGitCommit,
    },
    {
      type: "end",
      label: "End",
      icon: LuGitPullRequestClosed,
    },
  ],
  Operator: [
    {
      type: "condition",
      label: "Condition",
      icon: LuGitFork,
    },
  ],
};

export const CONFIG: Record<
  string,
  { builder: () => ReactNode; settings: () => ReactNode }
> = {
  form: {
    builder: plugin.form,
    settings: settings.form,
  },
  string: {
    builder: plugin.string,
    settings: settings.string,
  },
  password: {
    builder: plugin.password,
    settings: settings.password,
  },
  textarea: {
    builder: plugin.textarea,
    settings: settings.textarea,
  },
  number: {
    builder: plugin.number,
    settings: settings.number,
  },
};

export const BLOCKS: Record<string, Block[]> = {
  "Text Inputs": [
    {
      type: "string",
      label: "Text Input",
      icon: LuTextCursorInput,
      presets: {
        label: "Label",
        description: "Description",
      },
    },
    {
      type: "string",
      label: "Email",
      icon: MdOutlineMailOutline,
      presets: {
        inputType: "email",
        label: "Label",
        description: "Description",
        prefixIcon: <HiOutlineMail className="opacity-60" />,
      },
    },
    {
      type: "string",
      label: "url",
      icon: MdLink,
      presets: {
        inputType: "url",
        label: "Label",
        description: "Description",
      },
    },
    {
      type: "password",
      label: "password",
      icon: MdOutlineKey,
      presets: {
        label: "Label",
        description: "Description",
      },
    },
    {
      type: "textarea",
      label: "Textarea",
      icon: BsTextareaT,
      presets: {
        label: "Label",
        description: "Description",
      },
    },
  ],
  "Number Inputs": [
    {
      type: "number",
      label: "Number Input",
      icon: LuTextCursorInput,
      presets: {
        inputType: "number",
        label: "Label",
        description: "Description",
      },
    },
  ],
};
