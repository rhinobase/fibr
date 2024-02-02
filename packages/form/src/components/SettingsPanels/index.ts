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
        hidden: f.textInput({
          label: "Hidden",
        }),
        heading2: f.text({
          value: "# Advanced",
        }),
        tooltip: f.textInput({
          label: "Tooltip",
        }),
      }),
    ),
  }),
  // image: ImageSettingsPanel,
  // text: TextSettingsPanel,
  // string: TextInputSettingsPanel,
  // form: FormSettingsPanel,
};
