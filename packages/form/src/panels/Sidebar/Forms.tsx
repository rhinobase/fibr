import { SidebarItem } from "@fibr/builder";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

export function Forms() {
  return (
    <SidebarItem
      name="forms"
      label="Forms"
      icon={<Square3Stack3DIcon className="h-5 w-5 stroke-2" />}
      className="flex-col overflow-hidden overflow-y-auto data-[state=active]:flex data-[orientation=vertical]:p-0"
    >
      <div className="sticky top-0 z-10 space-y-3 bg-white p-3">
        <h4 className="font-medium">Forms</h4>
        <hr />
      </div>
    </SidebarItem>
  );
}
