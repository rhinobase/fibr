import { SidebarItem } from "@fibr/builder";
import {
  Squares2X2Icon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { PaletteCard } from "../components";
import { SearchField } from "@rafty/ui";

const FIELDS: PaletteCard[] = [
  {
    type: "string",
    label: "Text Input",
    icon: <ViewfinderCircleIcon className="h-6 w-6 opacity-50" />,
  },
  {
    type: "email",
    label: "Email",
    icon: <ViewfinderCircleIcon className="h-6 w-6 opacity-50" />,
  },
  {
    type: "url",
    label: "url",
    icon: <ViewfinderCircleIcon className="h-6 w-6 opacity-50" />,
  },
  {
    type: "editable-text",
    label: "editable text",
    icon: <ViewfinderCircleIcon className="h-6 w-6 opacity-50" />,
  },
  {
    type: "editable-textarea",
    label: "editable text area",
    icon: <ViewfinderCircleIcon className="h-6 w-6 opacity-50" />,
  },
  {
    type: "password",
    label: "password",
    icon: <ViewfinderCircleIcon className="h-6 w-6 opacity-50" />,
  },
];

export function Palette() {
  return (
    <SidebarItem
      name="palette"
      label="Palette"
      icon={<Squares2X2Icon className="h-5 w-5 stroke-2" />}
      className="space-y-3 overflow-y-auto data-[orientation=vertical]:p-3"
    >
      <SearchField size="sm" />
      <div className="grid w-full grid-cols-3 gap-2.5">
        {FIELDS.map((field) => (
          <PaletteCard key={field.type} {...field} />
        ))}
      </div>
    </SidebarItem>
  );
}
