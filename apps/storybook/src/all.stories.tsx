import f from "@fiber/core";
import { Fiber, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { boolean, z } from "zod";
import { DevTool, Form } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@rafty/ui";

const meta: Meta = {
  title: "Fiber / All Fields",
};

export default meta;

type Story = StoryObj;

const allFieldsSchema = z.object({
  name: z.string(),
  phone: z.number(),
  list: z.array(z.string()),
  check: z.boolean(),
  date: z.date(),
  date_time: z.date(),
  object_field: z.object({}),
  array_field: z.array(
    z.object({
      sample: z.string(),
      on_off: boolean(),
    }),
  ),
  select_field: z.string(),
});

const blueprint = f.form<z.infer<typeof allFieldsSchema>>({
  validation: zodResolver(allFieldsSchema),
  default_values: {
    name: "this is a example",
    phone: 10,
    list: ["example"],
    check: true,
    date: "2023-08-02",
    date_time: "2023-08-02 07:59",
    readOnly: "It is a sample text",
    object_field: {
      first_name: "Bruce banner",
    },
    array_field: [{ sample: "lorem ipsem", on_off: false }],
  },
  fields: {
    name: f.string({
      label: "Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }),
    phone: f.number({
      label: "Phone",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }),
    list: f.array({
      label: "Inbox",
      of: f.string({ label: "Name" }),
    }),
    check: f.boolean({
      label: "Checkbox",
      description: "Lorem ipsum dolor sit amet",
    }),
    date: f.date({
      label: "Date",
      description: "Lorem ipsum dolor sit amet",
    }),
    date_time: f.datetime({
      label: "Date Time",
    }),
    object_field: f.object({
      label: "Father Name",
      fields: {
        first_name: f.string({ label: "First Name" }),
        last_name: f.string({
          label: "Last Name",
          placeholder: "Enter your last name",
        }),
      },
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }),
    array_field: f.array({
      label: "Message Box",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      of: f.object({
        fields: {
          sample: f.text({
            label: "Discription",
          }),
          on_off: f.boolean({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          }),
        },
      }),
    }),
    select_field: f.string({
      label: "Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
  },
});
export const AllField: Story = {
  render: () => (
    <Fiber blueprint={blueprint}>
      <Form>
        <Fields />
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </Form>
      <DevTool />
    </Fiber>
  ),
};
