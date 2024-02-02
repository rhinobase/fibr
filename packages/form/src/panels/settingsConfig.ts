import { f } from "@fibr/blocks";
import { ThreadType } from "@fibr/react";

export const settingsPanel: Record<string, ThreadType> = {
  form: f.form({
    title: "Form Settings",
    onSubmit: console.log,
    blocks: new Map(
      Object.entries({
        heading1: f.text({
          value: "# Form",
        }),
      }),
    ),
  }),
  divider: f.form({
    title: "Divider Settings",
    onSubmit: console.log,
    blocks: new Map(
      Object.entries({
        heading1: f.text({
          value: "# Basic",
        }),
        hidden: f.string({
          label: "Hidden",
        }),
        heading2: f.text({
          value: "# Advanced",
        }),
        tooltip: f.string({
          label: "Tooltip",
        }),
      }),
    ),
  }),
  image: f.form({
    title: "Image Settings",
    onSubmit: console.log,
    blocks: new Map(
      Object.entries({
        heading1: f.text({
          value: "# Basic",
        }),
        hidden: f.string({
          label: "Hidden",
        }),
        src: f.string({
          label: "Image source",
        }),
        heading2: f.text({
          value: "# Advanced",
        }),
        tooltip: f.string({
          label: "Tooltip",
        }),
      }),
    ),
  }),
  text: f.form({
    title: "Text Settings",
    onSubmit: console.log,
    blocks: new Map(
      Object.entries({
        heading1: f.text({
          value: "# Basic",
        }),
        hidden: f.string({
          label: "Hidden",
        }),
        "default-value": f.string({
          label: "Default value",
        }),
        heading2: f.text({
          value: "# Advanced",
        }),
        tooltip: f.string({
          label: "Tooltip",
        }),
      }),
    ),
  }),
  string: f.form({
    title: "Text Input Settings",
    onSubmit: console.log,
    blocks: new Map(
      Object.entries({
        heading1: f.text({
          value: "# Basic",
        }),
        label: f.string({
          label: "Label",
        }),
        caption: f.string({
          label: "Caption",
        }),
        hidden: f.string({
          label: "Hidden",
        }),
        placeholder: f.string({
          label: "Placeholder",
        }),
        "default-value": f.string({
          label: "Default value",
        }),
        heading2: f.text({
          value: "# Advanced",
        }),
        disabled: f.string({
          label: "Disabled",
        }),
        tooltip: f.string({
          label: "Tooltip",
        }),
        required: f.string({
          label: "Required",
        }),
      }),
    ),
  }),
  // text: TextSettingsPanel,
  // string: TextInputSettingsPanel,
};
