import { SidebarItem } from "@fibr/builder";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { OverviewCard } from "../components";

export function Overview() {
  return (
    <SidebarItem
      name="over"
      label="Over"
      icon={<ListBulletIcon className="h-5 w-5 stroke-2" />}
      className="data-[orientation=vertical]:p-3"
    >
      <div className="space-y-3">
        <h4 className="font-medium">Overview</h4>
        <hr />
        <div className="flex w-full flex-col gap-1.5">
          <OverviewCard />
        </div>
      </div>
    </SidebarItem>
  );
}
