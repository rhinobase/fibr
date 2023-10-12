import f from "@fiber/core";
import { FiberForm, FiberProvider, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool, ExtendComponent } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { OverrideComponent } from "./utils";
import { FieldValues, Resolver } from "react-hook-form";
import raftyPlugin from "@fiber/rafty";

const meta: Meta = {
  title: "Fiber / Extend",
};

export default meta;

type Story = StoryObj;

const includeSchema = z.object({
  first_name: z.string(),
});

export const Extend: Story = {
  render: () => (
    <FiberProvider
      plugins={[
        raftyPlugin,
        {
          sample_type: ExtendComponent,
        },
      ]}
    >
      <FiberForm
        blueprint={f.form<z.infer<typeof includeSchema>, Resolver<FieldValues>>(
          {
            validation: zodResolver(includeSchema),
            fields: {
              first_name: f.custom({
                type: "sample_type",
                label: "First Name",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              }),
            },
          }
        )}
        onSubmit={console.log}
      >
        <Fields />
        <DevTool />
      </FiberForm>
    </FiberProvider>
  ),
};

export const Override: Story = {
  render: () => (
    <FiberProvider
      plugins={[
        raftyPlugin,
        {
          string: OverrideComponent,
        },
      ]}
    >
      <FiberForm
        blueprint={f.form<z.infer<typeof includeSchema>, Resolver<FieldValues>>(
          {
            validation: zodResolver(includeSchema),
            fields: {
              first_name: f.string({
                label: "First Name",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              }),
            },
          }
        )}
        onSubmit={console.log}
      >
        <Fields />
        <DevTool />
      </FiberForm>
    </FiberProvider>
  ),
};
