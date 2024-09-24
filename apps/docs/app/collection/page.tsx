"use client";
import { quackFields } from "@duck-form/fields";
import { Workspace } from "@fibr/builder";
import { useBoolean } from "@rafty/ui";
import { DuckForm } from "duck-form";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Canvas, CanvasSettings, formBlocks, formConfig } from "./Blocks";
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
          }}
          generateId={(_, props) => (props.id ? String(props.id) : undefined)}
        >
          <Workspace className="flex h-screen w-full flex-col">
            <Builder
              schema={DEFAULT_SCHEMA}
              blocks={formBlocks}
              config={{
                ...formConfig,
                canvas: { builder: Canvas, settings: CanvasSettings },
              }}
            />
          </Workspace>
        </DuckForm>
      </FormProvider>
    );
}
