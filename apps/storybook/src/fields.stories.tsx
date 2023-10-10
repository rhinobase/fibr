import f from "@fiber/core";
import { Fiber, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";

const meta: Meta = {
  title: "Fiber / Fields",
};

export default meta;

type Story = StoryObj;

const includeSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  new_phone: z.string(),
  old_phone: z.string(),
});

const blueprint = f.form<z.infer<typeof includeSchema>>({
  validation: zodResolver(includeSchema),
  default_values: {
    new_phone: "sit amet Lorem ipsum",
  },
  fields: {
    first_name: f.string({
      label: "First Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }),
    last_name: f.string({
      label: "Last Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }),
    phone: f.string({
      label: "Phone",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }),
    new_phone: f.string({
      label: "Phone",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      readOnly: true,
    }),
    old_phone: f.string({
      label: "Phone",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      hidden: true,
    }),
  },
});

export const Include: Story = {
  render: () => (
    <Fiber blueprint={blueprint}>
      <Fields include={["first_name"]} />
      <DevTool />
    </Fiber>
  ),
};

export const Exclude: Story = {
  render: () => (
    <Fiber blueprint={blueprint}>
      <Fields exclude={["first_name"]} />
      <DevTool />
    </Fiber>
  ),
};
