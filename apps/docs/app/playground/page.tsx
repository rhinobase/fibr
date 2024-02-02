"use client";
import { plugin } from "@fibr/blocks";
import { Workspace } from "@fibr/builder";
import { Block, Category, FormBuilder } from "@fibr/form-builder";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { HiViewfinderCircle } from "react-icons/hi2";
import { LuTextCursorInput } from "react-icons/lu";
import {
  MdLink,
  MdOutlineImage,
  MdOutlineKey,
  MdOutlineMailOutline,
  MdTextFields,
} from "react-icons/md";
import { RxDividerHorizontal } from "react-icons/rx";
import { Header } from "./Header";
import { Container } from "./utils";

const BLOCKS: Record<Category, Block[]> = {
  [Category.PRESENTATION]: [
    {
      type: "text",
      label: "Text",
      icon: MdTextFields,
      presets: {
        value: "Text field",
      },
      builder: plugin.text,
    },
    {
      type: "image",
      label: "Image",
      icon: MdOutlineImage,
      presets: {
        src: "https://via.placeholder.com/200",
        alt: "Image field",
      },
      builder: plugin.image,
    },
    {
      type: "divider",
      label: "Divider",
      icon: RxDividerHorizontal,
      builder: plugin.divider,
    },
  ],
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
      type: "editable-text",
      label: "editable text",
      icon: HiViewfinderCircle,
      presets: {
        label: "Label",
        description: "Description",
      },
      builder: plugin.string,
    },
    {
      type: "editable-textarea",
      label: "editable text area",
      icon: HiViewfinderCircle,
      presets: {
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
