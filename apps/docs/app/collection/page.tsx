"use client";
import { quackFields } from "@duck-form/fields";
import { type FieldType, formConfig } from "@fibr/blocks";
import { type Block, Workspace } from "@fibr/builder";
import { useBoolean } from "@rafty/ui";
import { DuckForm } from "duck-form";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsBraces, BsTextareaT } from "react-icons/bs";
import { LuTextCursorInput } from "react-icons/lu";
import { MdOutlineKey } from "react-icons/md";
import { Canvas, DisplayField, StringArrayField } from "./Blocks";
import { Builder } from "./Builder";

const formBlocks: Record<string, Block<FieldType>[]> = {
  "Text Inputs": [
    {
      type: "string",
      label: "Text Input",
      icon: LuTextCursorInput,
      presets: {
        label: "Label",
      },
    },
    {
      type: "textarea",
      label: "Textarea",
      icon: BsTextareaT,
      presets: {
        label: "Label",
      },
    },
  ],
  "Array Field": [
    {
      type: "array",
      label: "Array",
      icon: MdOutlineKey,
      presets: {
        of: {
          type: "string",
          label: "String",
        },
        label: "Label",
      },
    },
  ],
  "Nested Object": [
    {
      type: "object",
      label: "Object Group",
      icon: BsBraces,
      presets: {
        fields: {},
        label: "Label",
        description: "Description",
      },
    },
  ],
};

export default function CollectionPage() {
  const [isClient, setClient] = useBoolean();
  const methods = useForm();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setClient(true);
  }, []);

  if (isClient)
    return (
      <FormProvider {...methods}>
        <DuckForm
          components={{
            ...quackFields,
            canvas: Canvas,
            display: DisplayField,
            stringArray: StringArrayField,
          }}
          generateId={(_, props) => (props.id ? String(props.id) : undefined)}
        >
          <Workspace
            className="flex h-screen w-full flex-col"
            onPointerDownCapture={(event) => {
              event.stopPropagation();
            }}
            onKeyDownCapture={(event) => {
              event.stopPropagation();
            }}
          >
            <Builder
              schema={[
                {
                  id: "canvas",
                  type: "canvas",
                  data: { title: "Contact Us" },
                },
                {
                  id: "name",
                  type: "string",
                  label: "Name",
                  required: true,
                  parentNode: "canvas",
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
                {
                  id: "validation",
                  type: "textarea",
                  label: "Validation",
                  parentNode: "canvas",
                },
                {
                  id: "schema",
                  type: "textarea",
                  label: "Schema",
                  parentNode: "canvas",
                },
                {
                  id: "preview",
                  type: "textarea",
                  label: "Preview",
                  parentNode: "canvas",
                },
                {
                  id: "initial",
                  type: "textarea",
                  label: "Initial",
                  parentNode: "canvas",
                },
                {
                  id: "hidden",
                  type: "array",
                  of: {
                    type: "string",
                    label: "String",
                  },
                  label: "Hidden",
                  parentNode: "canvas",
                },
                {
                  id: "change",
                  type: "textarea",
                  label: "Change",
                  parentNode: "canvas",
                },
              ]}
              blocks={formBlocks}
              config={formConfig}
            />
          </Workspace>
        </DuckForm>
      </FormProvider>
    );
}
