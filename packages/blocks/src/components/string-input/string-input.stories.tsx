import { FibrProvider, Loom } from "@fibr/react";
import { Meta, StoryObj } from "@storybook/react";
import { f, plugin } from "..";
import type { StringInput } from "./StringInput";

const meta: Meta<StringInput> = {
  title: "fibr / StringInput",
  args: {
    label: "Label",
    defaultValue: "",
    description: "This is the field description",
    disabled: false,
    hidden: false,
    placeholder: "",
    tooltip: "This is Text Input Field",
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    hidden: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<StringInput>;

export const Default: Story = {
  render: (props) => (
    <FibrProvider plugins={plugin}>
      <div className="w-full">
        <Loom
          blueprint={f.form({
            onSubmit: console.log,
            components: {
              string: f.string({
                ...props,
                name: "string",
              }),
            },
          })}
        />
      </div>
    </FibrProvider>
  ),
};
