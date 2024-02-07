/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { plugin, settings } from "@fibr/blocks";
import { Workspace } from "@fibr/builder";
import { FormBuilder } from "@fibr/form-builder";
import type { ThreadType } from "@fibr/react";
import { type Block } from "@fibr/shared";
import { type ReactNode, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { LuTextCursorInput } from "react-icons/lu";
import { MdLink, MdOutlineKey, MdOutlineMailOutline } from "react-icons/md";
import { Header } from "./Header";
import { Container, TemplateDialog } from "./templates";

const CONFIG: Record<
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

const BLOCKS: Record<string, Block[]> = {
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
      icon: MdOutlineKey,
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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type PanelProps = { template: ThreadType<any> };

const PANELS: Record<Container, (props: PanelProps) => ReactNode> = {
  [Container.FORM]: ({ template }) => (
    <FormBuilder
      schema={new Map(Object.entries({ form: template }))}
      blocks={BLOCKS}
      config={CONFIG}
    />
  ),
  [Container.WORKFLOW]: () => <></>,
  [Container.PAGE]: () => <></>,
};

export default function Playground() {
  const [container, setContainer] = useState(Container.FORM);
  const [template, setTemplate] = useState<PanelProps["template"] | null>();

  const Component = PANELS[container];

  return (
    <Workspace>
      <Header />
      <TemplateDialog
        container={container}
        onContainerChange={setContainer}
        onSelect={setTemplate}
      />
      {template && <Component template={template} />}
    </Workspace>
  );
}
