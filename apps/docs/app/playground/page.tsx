"use client";
import { Block, Category, FormBuilder } from "@fibr/form-builder";
import { plugin } from "@rafty/fibr";
import { HiEnvelope, HiViewfinderCircle } from "react-icons/hi2";

const BLOCKS: Record<Category, Block[]> = {
  [Category.PRESENTATION]: [
    {
      type: "heading",
      label: "Heading",
      icon: HiViewfinderCircle,
      component: plugin.heading,
    },
    {
      type: "text",
      label: "Text",
      icon: HiViewfinderCircle,
      component: plugin.text,
    },
    {
      type: "image",
      label: "Image",
      icon: HiViewfinderCircle,
      component: plugin.image,
    },
    {
      type: "divider",
      label: "Divider",
      icon: HiViewfinderCircle,
      component: plugin.divider,
    },
  ],
  [Category.TEXT_INPUTS]: [
    {
      type: "string",
      label: "Text Input",
      icon: HiViewfinderCircle,
      component: plugin["text-input"],
    },
    {
      type: "string",
      label: "Email",
      icon: HiEnvelope,
      component: plugin["text-input"],
    },
    {
      type: "string",
      label: "url",
      icon: HiViewfinderCircle,
      component: plugin["text-input"],
    },
    {
      type: "editable-text",
      label: "editable text",
      icon: HiViewfinderCircle,
      component: plugin["text-input"],
    },
    {
      type: "editable-textarea",
      label: "editable text area",
      icon: HiViewfinderCircle,
      component: plugin["text-input"],
    },
    {
      type: "password",
      label: "password",
      icon: HiViewfinderCircle,
      component: plugin["text-input"],
    },
  ],
  [Category.NUMBER_INPUTS]: [
    {
      type: "number",
      label: "Number Input",
      icon: HiViewfinderCircle,
      component: plugin["text-input"],
    },
  ],
};

export default function Playground() {
  return <FormBuilder blocks={BLOCKS} />;
}
