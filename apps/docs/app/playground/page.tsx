"use client";
import { Block, Category, FormBuilder } from "@fibr/form-builder";
import { HiViewfinderCircle } from "react-icons/hi2";

const BLOCKS: Block[] = [
  {
    type: "string",
    label: "Text Input",
    icon: <HiViewfinderCircle className="size-6 opacity-50" />,
    category: Category.TEXT_FIELD,
  },
  {
    type: "email",
    label: "Email",
    icon: <HiViewfinderCircle className="size-6 opacity-50" />,
    category: Category.TEXT_FIELD,
  },
  {
    type: "url",
    label: "url",
    icon: <HiViewfinderCircle className="size-6 opacity-50" />,
    category: Category.TEXT_FIELD,
  },
  {
    type: "editable-text",
    label: "editable text",
    icon: <HiViewfinderCircle className="size-6 opacity-50" />,
    category: Category.TEXT_FIELD,
  },
  {
    type: "editable-textarea",
    label: "editable text area",
    icon: <HiViewfinderCircle className="size-6 opacity-50" />,
    category: Category.TEXT_FIELD,
  },
  {
    type: "password",
    label: "password",
    icon: <HiViewfinderCircle className="size-6 opacity-50" />,
    category: Category.TEXT_FIELD,
  },
];

export default function Playground() {
  return <FormBuilder blocks={BLOCKS} />;
}
