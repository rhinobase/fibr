import {
  BuilderPanel,
  Sidebar as BuilderSidebar,
  SidebarList,
  useCanvas,
} from "@fibr/builder";
import { Palette } from "./Palette";

export function Sidebar() {
  const add = useCanvas(({ add }) => add);

  return (
    <BuilderPanel side="left" isResizable>
      <BuilderSidebar className="items-center gap-2 bg-transparent py-2 pl-2 dark:bg-transparent">
        <SidebarList className="dark:bg-secondary-950 h-max gap-1 rounded-md border-r-0 bg-white p-1 shadow-md">
          <div className="dark:bg-secondary-950 h-full w-full overflow-hidden rounded-md bg-white shadow-md">
            <Palette
              enableDragging
              onSelect={(value) => add({ blockData: value })}
            />
          </div>
        </SidebarList>
      </BuilderSidebar>
    </BuilderPanel>
  );
}
