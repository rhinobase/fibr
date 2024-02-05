"use client";
import { plugin } from "@fibr/blocks";
import { Workspace } from "@fibr/builder";
import { FormBuilder } from "@fibr/form-builder";
import { type Block, Category } from "@fibr/shared";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { LuTextCursorInput } from "react-icons/lu";
import { MdLink, MdOutlineKey, MdOutlineMailOutline } from "react-icons/md";
import { Header } from "./Header";
import { Container } from "./utils";

const BLOCKS: Record<Category, Block[]> = {
  [Category.TEXT_INPUTS]: [
    {
      type: "string",
      label: "Text Input",
      icon: LuTextCursorInput,
      presets: {
        label: "Label",
        description: "Description",
      },
      builder: plugin.string,
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
      builder: plugin.string,
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
      builder: plugin.string,
    },
    {
      type: "password",
      label: "password",
      icon: MdOutlineKey,
      presets: {
        label: "Label",
        description: "Description",
      },
      builder: plugin.password,
    },
    {
      type: "textarea",
      label: "Textarea",
      icon: MdOutlineKey,
      presets: {
        label: "Label",
        description: "Description",
      },
      builder: plugin.textarea,
    },
  ],
  [Category.NUMBER_INPUTS]: [
    {
      type: "number",
      label: "Number Input",
      icon: LuTextCursorInput,
      presets: {
        inputType: "number",
        label: "Label",
        description: "Description",
      },
      builder: plugin.string,
    },
  ],
};

export default function Playground() {
  const [container, setContainer] = useState(Container.BUILDER);

  return (
    <Workspace>
      <Header container={container} onContainerChange={setContainer} />
      {container === Container.BUILDER && <FormBuilder blocks={BLOCKS} />}
      {container === Container.FLOW && <div />}
    </Workspace>
  );
}
