import f from "@fiber/core";
import { Fiber, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";

const meta: Meta = {
  title: "Fiber / Date",
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
    <Fiber
      blueprint={f.form<z.infer<typeof defaultSchema>>({
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
    </Fiber>
  ),
};
