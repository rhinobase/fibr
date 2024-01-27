"use client";
import { Block, Category, FormBuilder } from "@fibr/form-builder";
import { HiViewfinderCircle } from "react-icons/hi2";

const BLOCKS: Block[] = [
  {
    type: "string",
    label: "Text Input",
    icon: HiViewfinderCircle,
    category: Category.TEXT_INPUTS,
  },
  {
    type: "email",
    label: "Email",
    icon: HiViewfinderCircle,
    category: Category.TEXT_INPUTS,
  },
  {
    type: "url",
    label: "url",
    icon: HiViewfinderCircle,
    category: Category.TEXT_INPUTS,
  },
  {
    type: "editable-text",
    label: "editable text",
    icon: HiViewfinderCircle,
    category: Category.TEXT_INPUTS,
  },
  {
    type: "editable-textarea",
    label: "editable text area",
    icon: HiViewfinderCircle,
    category: Category.TEXT_INPUTS,
  },
  {
    type: "password",
    label: "password",
    icon: HiViewfinderCircle,
    category: Category.TEXT_INPUTS,
  },
  {
    type: "number",
    label: "Number Input",
    icon: HiViewfinderCircle,
    category: Category.NUMBER_INPUTS,
  },
];

export default function Playground() {
  return <FormBuilder blocks={BLOCKS} />;
}
