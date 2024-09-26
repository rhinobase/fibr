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
  prev[type] = {
    builder: field,
    settings: getSettings(type as FieldProps["type"]),
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
      icon: AiOutlinePercentage,
      presets: {
        type: "percentageInput",
        label: "Label",
        description: "Description",
      },
    },
    {
      label: "Pin",
      icon: MdPushPin,
      presets: {
        type: "pin",
        length: 4,
        label: "Label",
      },
    },
    {
      label: "Currency Input",
      icon: BsCurrencyDollar,
      presets: {
        type: "currencyInput",
        label: "Label",
        description: "Description",
      },
    },
    {
      label: "Editable Number",
      icon: LuTextCursorInput,
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
      icon: RxSlider,
      presets: {
        type: "slider",
        label: "Label",
      },
    },
    {
      label: "Range Slider",
      icon: PiSlidersHorizontal,
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
  "Select Inputs": [
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
        type: "select",
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
  "Date and Time Inputs": [
    {
      label: "Date",
      icon: BsCalendar2Date,
      presets: { type: "date", label: "Label" },
    },
    {
      label: "Date Range",
      icon: BsCalendar2Range,
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
      icon: MdDataArray,
      presets: {
        type: "array",
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
      icon: MdColorLens,
      presets: {
        type: "colorPicker",
        label: "Label",
      },
    },
  ],
};
