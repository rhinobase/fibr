import { SidebarItem } from "@fibr/builder";
import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";

export function InspectorPanel() {
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
