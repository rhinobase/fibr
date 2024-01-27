"use client";
import { Block, Category, FormBuilder } from "@fibr/form-builder";
import { HiEnvelope, HiViewfinderCircle } from "react-icons/hi2";

const BLOCKS: Record<Category, Block[]> = {
  [Category.TEXT_INPUTS]: [
    {
      type: "string",
      label: "Text Input",
      icon: HiViewfinderCircle,
    },
    {
      type: "email",
      label: "Email",
      icon: HiEnvelope,
    },
    {
      type: "url",
      label: "url",
      icon: HiViewfinderCircle,
    },
    {
      type: "editable-text",
      label: "editable text",
      icon: HiViewfinderCircle,
    },
    {
      type: "editable-textarea",
      label: "editable text area",
      icon: HiViewfinderCircle,
    },
    {
      type: "password",
      label: "password",
      icon: HiViewfinderCircle,
    },
  ],
  [Category.NUMBER_INPUTS]: [
    {
      type: "number",
      label: "Number Input",
      icon: HiViewfinderCircle,
    },
  ],
};

export default function Playground() {
  return <FormBuilder blocks={BLOCKS} />;
}
