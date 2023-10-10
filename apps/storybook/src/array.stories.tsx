import f from "@fiber/core";
import { Fiber, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "./utils";

const meta: Meta = {
  title: "Fiber / Array",
};

export default meta;

type Story = StoryObj;

const defaultSchema = z.object({
  name: z.string(),
  default_page: z.array(z.string()),
  new_page: z.string(),
});
export const Default: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof defaultSchema>>({
        validation: zodResolver(defaultSchema),
        default_values: {
          default_page: ["Lorem ipsum"],
        },
        fields: {
          name: f.array({
            label: "Name",
            of: f.string({ label: "Name" }),
          }),
          default_page: f.array({
            label: "Name",
            of: f.string({ label: "Name" }),
            readOnly: true,
          }),
          new_page: f.array({
            label: "Name",
            of: f.string({ label: "Name" }),
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

const gridSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  Full_name: z.string(),
});
export const Grid: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof gridSchema>>({
        validation: zodResolver(gridSchema),
        default_values: {
          first_name: "Sample Name",
          last_name: "Sample Surname",
        },
        fields: {
          first_name: f.array({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              layout: "grid",
            },
            of: f.string({ label: "Name" }),
          }),
          last_name: f.array({
            label: "default",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              layout: "grid",
            },
            of: f.string({ label: "Name" }),
            readOnly: true,
          }),
          Full_name: f.array({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              layout: "grid",
            },
            of: f.string({ label: "Name" }),
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

const tagSchema = z.object({
  name: z.string(),
  sample_first: z.array(z.string()),
  demo_first: z.string(),
});
export const Tag: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof tagSchema>>({
        validation: zodResolver(tagSchema),
        default_values: {
          sample_first: ["demo example first"],
        },
        fields: {
          name: f.array({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              layout: "tag",
            },
            of: f.string({ label: "Name" }),
          }),
          sample_first: f.array({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              layout: "tag",
            },
            of: f.string({ label: "Name" }),
            readOnly: true,
          }),
          demo_first: f.array({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              layout: "tag",
            },
            of: f.string({ label: "Name" }),
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

const nestedSchema = z.object({
  name: z.array(
    z.object({
      sample: z.string(),
    }),
  ),
});
export const NestedFields: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof nestedSchema>>({
        validation: zodResolver(nestedSchema),
        fields: {
          name: f.array({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            of: f.object({
              fields: {
                sample: f.string({
                  label: "Sample",
                }),
                on_off: f.boolean({
                  label: "Name",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                }),
                date_picker: f.date({
                  label: "Name",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                }),
                discription: f.text({
                  label: "Name",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  options: {
                    rows: 1,
                  },
                }),
                date_range: f.datetime({
                  label: "Name",
                }),
                phone: f.number({
                  label: "Phone No.",
                  description: "Lorem ipsum dolor sit amet, consectetur",
                }),
              },
            }),
          }),
        },
      })}
    >
      <Fields />
      <DevTool />
    </Fiber>
  ),
};
