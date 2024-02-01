"use client";
import { plugin } from "@fibr/blocks";
import { Block, Category, FormBuilder } from "@fibr/form-builder";
import { HiOutlineMail } from "react-icons/hi";
import { HiEnvelope, HiViewfinderCircle } from "react-icons/hi2";

const BLOCKS: Record<Category, Block[]> = {
  [Category.PRESENTATION]: [
    {
      type: "text",
      label: "Text",
      icon: HiViewfinderCircle,
      presets: {
        value: "Text field",
      },
      builder: plugin.text,
    },
    {
      type: "image",
      label: "Image",
      icon: HiViewfinderCircle,
      presets: {
        src: "https://via.placeholder.com/200",
        alt: "Image field",
      },
      builder: plugin.image,
    },
    {
      type: "divider",
      label: "Divider",
      icon: HiViewfinderCircle,
      builder: plugin.divider,
    },
  ],
  [Category.TEXT_INPUTS]: [
    {
      type: "string",
      label: "Text Input",
      icon: HiViewfinderCircle,
      presets: {
        label: "Label",
        description: "Description",
      },
      builder: plugin["text-input"],
    },
    {
      type: "string",
      label: "Email",
      icon: HiEnvelope,
      presets: {
        inputType: "email",
        label: "Label",
        description: "Description",
        prefixIcon: <HiOutlineMail className="opacity-60" />,
      },
      builder: plugin["text-input"],
    },
    {
      type: "string",
      label: "url",
      icon: HiViewfinderCircle,
      presets: {
        inputType: "url",
        label: "Label",
        description: "Description",
      },
      builder: plugin["text-input"],
    },
    {
      type: "editable-text",
      label: "editable text",
      icon: HiViewfinderCircle,
      presets: {
        label: "Label",
        description: "Description",
      },
      builder: plugin["text-input"],
    },
    {
      type: "editable-textarea",
      label: "editable text area",
      icon: HiViewfinderCircle,
      presets: {
        label: "Label",
        description: "Description",
      },
      builder: plugin["text-input"],
    },
    {
      type: "password",
      label: "password",
      icon: HiViewfinderCircle,
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
      icon: HiViewfinderCircle,
      presets: {
        inputType: "number",
        label: "Label",
        description: "Description",
      },
      builder: plugin["text-input"],
    },
  ],
};

export default function Playground() {
  return <FormBuilder blocks={BLOCKS} />;
}
