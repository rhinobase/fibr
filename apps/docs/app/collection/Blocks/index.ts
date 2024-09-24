import type { FieldProps } from "@duck-form/fields";
import { quackFields } from "@duck-form/fields";
import type { Block, Config } from "@fibr/builder";
import {
  BsBraces,
  BsListCheck,
  BsSegmentedNav,
  BsTextareaT,
} from "react-icons/bs";
import { FaCalendar, FaTags } from "react-icons/fa6";
import { IoIosSwitch } from "react-icons/io";
import { LuTextCursorInput } from "react-icons/lu";
import {
  MdCheckBox,
  MdEdit,
  MdLink,
  MdOutlineKey,
  MdOutlineMailOutline,
  MdStar,
} from "react-icons/md";
import {
  RiCheckboxMultipleFill,
  RiEdit2Fill,
  RiListCheck3,
  RiListRadio,
} from "react-icons/ri";
import { RxSwitch } from "react-icons/rx";
import { CommanSetting } from "./settings";

export { Canvas } from "./components";
export * from "./settings";

export const formConfig: Record<string, Config> = Object.entries(
  quackFields,
).reduce<Record<string, Config>>((prev, [type, field]) => {
  prev[type] = {
    builder: field,
    settings: CommanSetting,
  };
  return prev;
}, {});

export const formBlocks: Record<string, Omit<Block<FieldProps>, "type">[]> = {
  "Text Inputs": [
    {
      label: "Text Input",
      icon: LuTextCursorInput,
      presets: {
        type: "string",
        label: "Label",
      },
    },
    {
      label: "Email",
      icon: MdOutlineMailOutline,
      presets: {
        type: "string",
        inputType: "email",
        label: "Label",
        description: "Description",
        prefixIcon: "envelope",
      },
    },
    {
      label: "URL",
      icon: MdLink,
      presets: {
        type: "string",
        inputType: "url",
        label: "Label",
        description: "Description",
      },
    },
    {
      label: "password",
      icon: MdOutlineKey,
      presets: {
        type: "password",
        label: "Label",
        description: "Description",
      },
    },
    {
      label: "Textarea",
      icon: BsTextareaT,
      presets: { type: "textarea", label: "Label" },
    },
    {
      label: "Editable Text",
      icon: MdEdit,
      presets: {
        type: "editableText",
        label: "Label",
      },
    },
    {
      label: "Editable Textarea",
      icon: RiEdit2Fill,
      presets: {
        type: "editableTextarea",
        label: "Label",
      },
    },
  ],
  "Number Inputs": [
    {
      label: "Number Input",
      icon: LuTextCursorInput,
      presets: {
        type: "number",
        label: "Label",
        description: "Description",
      },
    },
    {
      label: "Percentage Input",
      icon: LuTextCursorInput,
      presets: {
        type: "percentageInput",
        label: "Label",
        description: "Description",
      },
    },
    {
      label: "Pin",
      icon: BsTextareaT,
      presets: {
        type: "pin",
        length: 4,
        label: "Label",
      },
    },
    {
      label: "Currency Input",
      icon: LuTextCursorInput,
      presets: {
        type: "currencyInput",
        label: "Label",
        description: "Description",
      },
    },
    {
      label: "Editable Number",
      icon: BsTextareaT,
      presets: {
        type: "editableNumber",
        label: "Label",
      },
    },
    {
      label: "Rating",
      icon: MdStar,
      presets: {
        type: "rating",
        label: "Label",
        count: 5,
      },
    },
    {
      label: "Slider",
      icon: BsTextareaT,
      presets: {
        type: "slider",
        label: "Label",
      },
    },
    {
      label: "Range Slider",
      icon: BsTextareaT,
      presets: {
        type: "rangeSlider",
        label: "Label",
      },
    },
  ],
  Presentation: [
    {
      label: "Tag Input",
      icon: FaTags,
      presets: {
        type: "tag",
        label: "Label",
      },
    },
  ],
  "Select inputs": [
    {
      label: "Checkbox",
      icon: MdCheckBox,
      presets: {
        type: "boolean",
        label: "Label",
      },
    },
    {
      label: "Switch",
      icon: RxSwitch,
      presets: {
        type: "switch",
        label: "Label",
      },
    },
    {
      label: "Checkbox Group",
      icon: RiCheckboxMultipleFill,
      presets: {
        type: "checkboxgroup",
        label: "Label",
        options: [],
      },
    },
    {
      label: "Switch Group",
      icon: IoIosSwitch,
      presets: {
        type: "switchGroup",
        label: "Label",
        options: [],
      },
    },
    {
      label: "Radio",
      icon: RiListRadio,
      presets: {
        type: "radio",
        label: "Label",
        options: [],
      },
    },
    {
      label: "Select",
      icon: RiListCheck3,
      presets: {
        type: "radio",
        label: "Label",
        options: [],
      },
    },
    {
      label: "Segmented Control",
      icon: BsSegmentedNav,
      presets: {
        type: "segmentedControl",
        label: "Label",
        options: [],
      },
    },
    {
      label: "Listbox",
      icon: RiListCheck3,
      presets: {
        type: "listbox",
        label: "Label",
        options: [],
      },
    },
    {
      label: "Multi Listbox",
      icon: BsListCheck,
      presets: {
        type: "multiListbox",
        label: "Label",
        options: [],
      },
    },
  ],
  "Date and Time Input": [
    {
      label: "Date",
      icon: BsTextareaT,
      presets: { type: "date", label: "Label" },
    },
    {
      label: "Date Range",
      icon: BsTextareaT,
      presets: {
        type: "dateRange",
        label: "Label",
      },
    },
    {
      label: "Calendar",
      icon: FaCalendar,
      presets: {
        type: "calendar",
        label: "Label",
      },
    },
  ],
  "Array Field": [
    {
      label: "Array",
      icon: MdOutlineKey,
      presets: {
        type: "array",
        of: {
          type: "string",
          label: "String",
        },
        label: "Label",
      },
    },
  ],
  "Nested Object": [
    {
      label: "Object Group",
      icon: BsBraces,
      presets: {
        type: "object",
        fields: {},
        label: "Label",
      },
    },
  ],
  "Special Input": [
    {
      label: "Color Picker",
      icon: BsTextareaT,
      presets: {
        type: "colorPicker",
        label: "Label",
      },
    },
  ],
};
