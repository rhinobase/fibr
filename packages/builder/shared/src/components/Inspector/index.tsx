import { SidebarItem } from "@fibr/builder";
import { BlockType } from "@fibr/providers";
import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";

export type InspectorPanel = { block?: BlockType };

export function InspectorPanel({ block }: InspectorPanel) {
  return (
    <SidebarItem
      name="inspector"
      label="Inspector"
      icon={<CursorArrowRippleIcon className="size-5 stroke-2" />}
      className="h-full"
    >
      Inspector
    </SidebarItem>
  );
}
