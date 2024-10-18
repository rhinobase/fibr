import {
  Sidebar as BuilderSidebar,
  ResizeHandle,
  SidebarContent,
  SidebarList,
  useCanvas,
} from "@fibr/builder";
import { Palette } from "./Palette";

export function Sidebar() {
  const add = useCanvas(({ add }) => add);

  return (
    <BuilderSidebar isResizable resizeHandler={<ResizeHandle />}>
      <SidebarContent className="items-center gap-2 py-2 pl-2">
        <SidebarList className="dark:bg-secondary-950 h-max gap-1 rounded-md border-r-0 bg-white p-1 shadow-md">
          <div className="dark:bg-secondary-950 h-full w-full overflow-hidden rounded-[inherit] bg-white shadow-[inherit]">
            <Palette
              enableDragging
              onSelect={(value) => add({ blockData: value })}
            />
          </div>
        </SidebarList>
      </SidebarContent>
    </BuilderSidebar>
  );
}
