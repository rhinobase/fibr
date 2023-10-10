import f from "@fiber/core";
import { Fiber, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";

const meta: Meta = {
  title: "Fiber / String",
};

export default meta;

type Story = StoryObj;

const defaultSchema = z.object({
  name: z.string(),
  readOnly: z.string(),
  hidden: z.string(),
});

export const Default: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof defaultSchema>>({
        validation: zodResolver(defaultSchema),
        default_values: {
          readOnly: "Lorem ipsum",
        },
        fields: {
          name: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            placeholder: "Enter something here",
          }),
          readOnly: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            readOnly: true,
          }),
          hidden: f.string({
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

const radioSchema = z.object({
  name: z.string(),
  readOnly: z.string(),
  hidden: z.string(),
});

export const Radio: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof radioSchema>>({
        validation: zodResolver(radioSchema),
        default_values: {
          readOnly: "node js",
        },
        fields: {
          name: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.10", value: "py-3.10" },
                    { label: "Python 3.9", value: "py-3.9" },
                  ],
                },
              ],
              layout: "radio",
            },
          }),
          readOnly: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.10", value: "py-3.10" },
                    { label: "Python 3.9", value: "py-3.9" },
                  ],
                },
              ],
              layout: "radio",
            },
            readOnly: true,
          }),
          hidden: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.10", value: "py-3.10" },
                    { label: "Python 3.9", value: "py-3.9" },
                  ],
                },
              ],
              layout: "radio",
            },
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

const checkboxSchema = z.object({
  name: z.string(),
  readOnly: z.string(),
  hidden: z.string(),
});

export const Checkbox: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof checkboxSchema>>({
        validation: zodResolver(checkboxSchema),
        default_values: {
          readOnly: "sit amet, consectetur",
        },
        fields: {
          name: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.9", value: "py-3.9" },
                    { label: "Python 3.10", value: "py-3.10" },
                  ],
                },
              ],
              layout: "checkbox",
            },
          }),
          readOnly: f.string({
            label: "Example",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "React ",
                  value: "Next js",
                },
                {
                  label: "java",
                  value: [
                    { label: "java 3.9", value: "py-3.9" },
                    { label: "java 3.10", value: "py-3.10" },
                  ],
                },
              ],
              layout: "checkbox",
            },
            readOnly: true,
          }),
          hidden: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.9", value: "py-3.9" },
                    { label: "Python 3.10", value: "py-3.10" },
                  ],
                },
              ],
              layout: "checkbox",
            },
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

const comboboxSchema = z.object({
  name: z.string(),
  readOnly: z.string(),
  hidden: z.string(),
});

export const Combobox: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof comboboxSchema>>({
        validation: zodResolver(comboboxSchema),
        default_values: {
          readOnly: "Lorem  dolor sit amet ipsum",
        },
        fields: {
          name: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.10", value: "py-3.10" },
                    { label: "Python 3.9", value: "py-3.9" },
                  ],
                },
              ],
              layout: "combobox",
            },
          }),
          readOnly: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.10", value: "py-3.10" },
                    { label: "Python 3.9", value: "py-3.9" },
                  ],
                },
              ],
              layout: "combobox",
            },
            readOnly: true,
          }),
          hidden: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.10", value: "py-3.10" },
                    { label: "Python 3.9", value: "py-3.9" },
                  ],
                },
              ],
              layout: "combobox",
            },
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
const selectSchema = z.object({
  name: z.string(),
  readOnly: z.string(),
  hidden: z.string(),
});
export const Select: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof selectSchema>>({
        validation: zodResolver(selectSchema),
        default_values: {
          readOnly: "sit amet, consectetur",
        },
        fields: {
          name: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.9", value: "py-3.9" },
                    { label: "Python 3.10", value: "py-3.10" },
                  ],
                },
              ],
              layout: "select",
            },
          }),
          readOnly: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.9", value: "py-3.9" },
                    { label: "Python 3.10", value: "py-3.10" },
                  ],
                },
              ],
              layout: "select",
            },
            readOnly: true,
          }),
          hidden: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.9", value: "py-3.9" },
                    { label: "Python 3.10", value: "py-3.10" },
                  ],
                },
              ],
              layout: "select",
            },
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

const multipleSchema = z.object({
  name: z.string(),
  combo_sample: z.string(),
  drop_example: z.string(),
});

export const Multiple: Story = {
  render: () => (
    <Fiber
      blueprint={f.form<z.infer<typeof multipleSchema>>({
        validation: zodResolver(multipleSchema),
        default_values: {
          combo_sample: "Lorem  ipsum dolor sit ame ipsum",
        },
        fields: {
          name: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.10", value: "py-3.10" },
                    { label: "Python 3.9", value: "py-3.9" },
                  ],
                },
              ],
              layout: "multi",
            },
          }),
          combo_sample: f.string({
            label: "Esxample",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.10", value: "py-3.10" },
                    { label: "Python 3.9", value: "py-3.9" },
                  ],
                },
              ],
              layout: "multi",
            },
            readOnly: true,
          }),
          drop_example: f.string({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            options: {
              list: [
                {
                  label: "Node JS",
                  value: "js",
                },
                {
                  label: "Python",
                  value: [
                    { label: "Python 3.10", value: "py-3.10" },
                    { label: "Python 3.9", value: "py-3.9" },
                  ],
                },
              ],
              layout: "multi",
            },
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
