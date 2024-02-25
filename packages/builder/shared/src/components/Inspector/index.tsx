import { SidebarItem } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";

export function InspectorPanel() {
  const blocks = useCanvas(({ schema }) =>
    schema.filter(({ selected }) => selected),
  );

  return (
    <SidebarItem
      name="inspector"
      label="Inspector"
      icon={<CursorArrowRippleIcon className="size-5 stroke-2" />}
      className="h-full"
    >
      <pre>{JSON.stringify(blocks, null, 2)}</pre>
    </SidebarItem>
  );
}
