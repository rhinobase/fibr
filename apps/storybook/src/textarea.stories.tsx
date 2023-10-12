import f from "@fiber/core";
import { FiberForm, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Resolver } from "react-hook-form";

const meta: Meta = {
  title: "Fiber / Textarea",
};

export default meta;

type Story = StoryObj;

const defaultSchema = z.object({
  name: z.string(),
  bold_text: z.string(),
  drag_option: z.string(),
});

export const Default: Story = {
  render: () => (
    <FiberForm
      onSubmit={console.log}
      blueprint={f.form<z.infer<typeof defaultSchema>, Resolver<FieldValues>>({
        validation: zodResolver(defaultSchema),
        default_values: {
          bold_text: "Lorem ipsum nothing else",
        },
        fields: {
          name: f.text({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              rows: 1,
            },
          }),
          bold_text: f.text({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              rows: 1,
            },
            readOnly: true,
          }),
          drag_option: f.text({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              rows: 1,
            },
            hidden: true,
          }),
        },
      })}
    >
      <Fields />
      <DevTool />
    </FiberForm>
  ),
};
