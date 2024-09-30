import type { FieldProps } from "@duck-form/fields";
import { quackFields } from "@duck-form/fields";
import type { Block, Config } from "@fibr/builder";
import { AiOutlinePercentage } from "react-icons/ai";
import {
  BsBraces,
  BsCalendar2Date,
  BsCalendar2Range,
  BsCurrencyDollar,
  BsListCheck,
  BsSegmentedNav,
  BsTextareaT,
} from "react-icons/bs";
import { FaCalendar, FaTags } from "react-icons/fa6";
import { IoIosSwitch } from "react-icons/io";
import { LuTextCursorInput } from "react-icons/lu";
import {
  MdCheckBox,
  MdColorLens,
  MdDataArray,
  MdEdit,
  MdLink,
  MdOutlineKey,
  MdOutlineMailOutline,
  MdPushPin,
  MdStar,
} from "react-icons/md";
import { PiSlidersHorizontal } from "react-icons/pi";
import {
  RiCheckboxMultipleFill,
  RiEdit2Fill,
  RiListCheck3,
  RiListRadio,
} from "react-icons/ri";
import { RxSlider, RxSwitch } from "react-icons/rx";
import { CommanSetting, SelectSetting } from "./settings";
export * from "./components";
export * from "./settings";

function getSettings(type: FieldProps["type"]) {
  switch (type) {
    case "select":
    case "radio":
    case "checkboxgroup":
    case "segmentedControl":
    case "listbox":
    case "multiListbox":
    case "switchGroup":
      return SelectSetting;
    default:
      return CommanSetting;
  }
}

export const formConfig: Record<string, Config> = Object.entries(
  quackFields,
).reduce<Record<string, Config>>((prev, [type, field]) => {
  if (type === "default")
    prev[type] = {
      builder: field,
    };
  else
    prev[type] = {
      builder: field,
      settings: getSettings(type as FieldProps["type"]),
    };

  return prev;
}, {});

export const formBlocks: Record<string, Block[]> = {
  "Text Inputs": [
    {
      type: "string",
      label: "Text Input",
      icon: LuTextCursorInput,
      presets: {
        label: "Label",
      },
    },
    {
      type: "string",
      label: "Email",
      icon: MdOutlineMailOutline,
      presets: {
        inputType: "email",
        label: "Label",
        description: "Description",
        prefixIcon: "envelope",
      },
    },
    {
      type: "string",
      label: "URL",
      icon: MdLink,
      presets: {
        inputType: "url",
        label: "Label",
        description: "Description",
      },
    },
    {
      type: "password",
      label: "password",
      icon: MdOutlineKey,
      presets: {
        label: "Label",
        description: "Description",
      },
    },
    {
      type: "textarea",
      label: "Textarea",
      icon: BsTextareaT,
      presets: { label: "Label" },
    },
    {
      type: "editableText",
      label: "Editable Text",
      icon: MdEdit,
      presets: {
        label: "Label",
      },
    },
    {
      type: "editableTextarea",
      label: "Editable Textarea",
      icon: RiEdit2Fill,
      presets: {
        label: "Label",
      },
    },
  ],
  "Number Inputs": [
    {
      type: "number",
      label: "Number Input",
      icon: LuTextCursorInput,
      presets: {
        label: "Label",
        description: "Description",
      },
    },
    {
      type: "percentageInput",
      label: "Percentage Input",
      icon: AiOutlinePercentage,
      presets: {
        label: "Label",
        description: "Description",
      },
    },
    {
      type: "pin",
      label: "Pin",
      icon: MdPushPin,
      presets: {
        length: 4,
        label: "Label",
      },
    },
    {
      type: "currencyInput",
      label: "Currency Input",
      icon: BsCurrencyDollar,
      presets: {
        label: "Label",
        description: "Description",
      },
    },
    {
      type: "editableNumber",
      label: "Editable Number",
      icon: LuTextCursorInput,
      presets: {
        label: "Label",
      },
    },
    {
      type: "rating",
      label: "Rating",
      icon: MdStar,
      presets: {
        label: "Label",
        count: 5,
      },
    },
    {
      type: "slider",
      label: "Slider",
      icon: RxSlider,
      presets: {
        label: "Label",
      },
    },
    {
      type: "rangeSlider",
      label: "Range Slider",
      icon: PiSlidersHorizontal,
      presets: {
        label: "Label",
      },
    },
  ],
  Presentation: [
    {
      type: "tag",
      label: "Tag Input",
      icon: FaTags,
      presets: {
        label: "Label",
      },
    },
  ],
  "Select Inputs": [
    {
      type: "boolean",
      label: "Checkbox",
      icon: MdCheckBox,
      presets: {
        label: "Label",
      },
    },
    {
      type: "switch",
      label: "Switch",
      icon: RxSwitch,
      presets: {
        label: "Label",
      },
    },
    {
      type: "checkboxgroup",
      label: "Checkbox Group",
      icon: RiCheckboxMultipleFill,
      presets: {
        label: "Label",
        options: [],
      },
    },
    {
      type: "switchGroup",
      label: "Switch Group",
      icon: IoIosSwitch,
      presets: {
        label: "Label",
        options: [],
      },
    },
    {
      type: "radio",
      label: "Radio",
      icon: RiListRadio,
      presets: {
        label: "Label",
        options: [],
      },
    },
    {
      type: "select",
      label: "Select",
      icon: RiListCheck3,
      presets: {
        label: "Label",
        options: [],
      },
    },
    {
      type: "segmentedControl",
      label: "Segmented Control",
      icon: BsSegmentedNav,
      presets: {
        label: "Label",
        options: [],
      },
    },
    {
      type: "listbox",
      label: "Listbox",
      icon: RiListCheck3,
      presets: {
        label: "Label",
        options: [],
      },
    },
    {
      type: "multiListbox",
      label: "Multi Listbox",
      icon: BsListCheck,
      presets: {
        label: "Label",
        options: [],
      },
    },
  ],
  "Date and Time Inputs": [
    {
      type: "date",
      label: "Date",
      icon: BsCalendar2Date,
      presets: { label: "Label" },
    },
    {
      type: "dateRange",
      label: "Date Range",
      icon: BsCalendar2Range,
      presets: {
        label: "Label",
      },
    },
    {
      type: "calendar",
      label: "Calendar",
      icon: FaCalendar,
      presets: {
        label: "Label",
      },
    },
  ],
  "Array Field": [
    {
      type: "array",
      label: "Array",
      icon: MdDataArray,
      presets: {
        label: "Label",
      },
    },
  ],
  "Nested Object": [
    {
      type: "object",
      label: "Object Group",
      icon: BsBraces,
      presets: {
        fields: {},
        label: "Label",
      },
    },
  ],
  "Special Input": [
    {
      type: "colorPicker",
      label: "Color Picker",
      icon: MdColorLens,
      presets: {
        label: "Label",
      },
    },
  ],
};
