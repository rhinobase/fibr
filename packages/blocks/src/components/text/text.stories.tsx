import { FibrProvider, Loom } from "@fibr/react";
import { Meta, StoryObj } from "@storybook/react";
import { f, plugin } from "..";
import type { Text } from "./Text";

const content = `# Heading level 1 
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

I just love **bold text**.

Italicized text is the *cat's meow*.

This text is ***really important***.

> Dorothy followed her through many of the beautiful rooms in her castle.

1. First item
  1. Nested item
2. Second item
3. Third item
4. Fourth item

---

- First item 
- Second item
- Third item
- Fourth item

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

| Syntax      | Description | Test Text     |
| :---        | :----:      |      ---:     |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

I need to highlight these ==very important words==.

- [ ] Write the press release
- [x] Update the website
- [ ] Contact the media

<p style="color:blue">Make this text blue.</p>

- [Underline](#underline)
- [Indent](#indent)
- [Center](#center)
- [Color](#color)

At the command prompt, type \`nano\`

\`\`\`jsx
import { Button } from "@rafty/ui"
<Button />
\`\`\`
`;

const meta: Meta<Text> = {
  title: "fibr / Text",
  args: {
    value: content,
    hidden: false,
    tooltip: "This is a text field",
  },
  argTypes: {
    hidden: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<Text>;

export const Default: Story = {
  render: (props) => (
    <FibrProvider plugins={plugin}>
      <div className="w-full">
        <Loom
          blueprint={f.form({
            onSubmit: console.log,
            components: {
              text: f.text(props),
            },
          })}
        />
      </div>
    </FibrProvider>
  ),
};
