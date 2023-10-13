import f from "@fibr/core";
import { fibrForm, Fields } from "@fibr/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Resolver } from "react-hook-form";

const meta: Meta = {
  title: "fibr / Fields",
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

const blueprint = f.form<z.infer<typeof includeSchema>, Resolver<FieldValues>>({
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
    <fibrForm blueprint={blueprint} onSubmit={console.log}>
      <Fields include={["first_name"]} />
      <DevTool />
    </fibrForm>
  ),
};

export const Exclude: Story = {
  render: () => (
    <fibrForm blueprint={blueprint} onSubmit={console.log}>
      <Fields exclude={["first_name"]} />
      <DevTool />
    </fibrForm>
  ),
};
