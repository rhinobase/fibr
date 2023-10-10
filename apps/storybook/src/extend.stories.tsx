import f from "@fiber/core";
import { Fiber, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool, ExtendComponent } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { OverrideComponent } from "./utils";

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
    <Fiber
      blueprint={f.form<z.infer<typeof includeSchema>>({
        validation: zodResolver(includeSchema),
        fields: {
          first_name: f.custom({
            type: "sample_type",
            label: "First Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          }),
        },
      })}
      components={{
        sample_type: ExtendComponent,
      }}
    >
      <Fields />
      <DevTool />
    </Fiber>
  ),
};

export const Override: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof includeSchema>>({
        validation: zodResolver(includeSchema),
        fields: {
          first_name: f.string({
            label: "First Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          }),
        },
      })}
      components={{
        string: OverrideComponent,
      }}
    >
      <Fields />
      <DevTool />
    </Fiber>
  ),
};
