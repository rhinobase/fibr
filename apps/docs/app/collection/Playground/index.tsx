"use client";
import { Workspace } from "@fibr/builder";
import {
  ArrayField,
  Canvas,
  CanvasSettings,
  formBlocks,
  formConfig,
} from "./Blocks";
import { Builder } from "./Builder";

const DEFAULT_SCHEMA = [
  {
    id: "canvas",
    type: "canvas",
    label: "Contact Us",
  },
  {
    id: "name",
    type: "string",
    label: "Name",
    required: true,
    parentNode: "canvas",
    hidden: false,
  },
  {
    id: "icon",
    type: "string",
    label: "Icon",
    required: true,
    parentNode: "canvas",
  },
  {
    id: "slug",
    type: "string",
    label: "Slug",
    required: true,
    parentNode: "canvas",
  },
];

export default function CollectionPage() {
  return (
    <Workspace className="flex h-screen w-full flex-col">
      <Builder
        schema={DEFAULT_SCHEMA}
        blocks={formBlocks}
        config={{
          ...formConfig,
          canvas: { builder: Canvas, settings: CanvasSettings },
          array: { builder: ArrayField, settings: CanvasSettings },
        }}
      />
    </Workspace>
  );
}
