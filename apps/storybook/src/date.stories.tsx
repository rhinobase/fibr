import f from "@fibr/core";
import { fibrForm, Fields } from "@fibr/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Resolver } from "react-hook-form";

const meta: Meta = {
  title: "fibr / Date",
};

export default meta;

type Story = StoryObj;

const defaultSchema = z.object({
  name: z.string(),
  fix_date: z.string(),
  end_date: z.string(),
});

export const Default: Story = {
  render: () => (
    <fibrForm
      onSubmit={console.log}
      blueprint={f.form<z.infer<typeof defaultSchema>, Resolver<FieldValues>>({
        validation: zodResolver(defaultSchema),
        fields: {
          name: f.date({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          }),
          fix_date: f.date({
            label: "Example",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            readOnly: true,
          }),
          end_date: f.date({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            hidden: true,
          }),
        },
      })}
    >
      <Fields />
      <DevTool />
    </fibrForm>
  ),
};
