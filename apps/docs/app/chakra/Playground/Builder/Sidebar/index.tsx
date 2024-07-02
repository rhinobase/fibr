import {
  BuilderPanel,
  Sidebar as BuilderSidebar,
  ResizeHandle,
  SidebarList,
  useBuilder,
  useCanvas,
} from "@fibr/builder";
import { classNames } from "@rafty/ui";
import { Palette } from "./Palette";

export function Sidebar() {
  const add = useCanvas(({ add }) => add);
  const { isDisabled, active, isSidebarOpen } = useBuilder(
    ({ layout: { sidebar }, tabs: { get, active } }) => {
      const currentTab = active != null ? get(active) : undefined;

      return {
        isDisabled: !sidebar || currentTab?.isResizeable === false,
        active,
        isSidebarOpen: sidebar,
      };
    },
  );

  return (
    <BuilderPanel
      isResizable
      resizeHandler={
        <ResizeHandle
          className={classNames(
            "group/handler pointer-events-auto relative w-1 bg-transparent",
            isDisabled && "hidden",
          )}
        >
          <div className="absolute left-0 h-full w-full transition-all ease-in-out group-hover/handler:bg-blue-500 group-data-[resize-handle-active]/handler:bg-blue-500" />
        </ResizeHandle>
      }
      className="pointer-events-none absolute left-0 top-0 z-50 h-full w-full"
    >
      <BuilderSidebar
        className={classNames(
          "dark:bg-secondary-950 pointer-events-auto flex h-full items-center gap-2 bg-transparent bg-white py-2 pl-2 dark:bg-transparent",
          (active === null || !isSidebarOpen) && "w-max",
        )}
      >
        <SidebarList className="dark:bg-secondary-950 dark:border-secondary-800 border-secondary-300 flex h-max flex-col gap-1 rounded-md border-r-0 bg-white p-1 shadow-md">
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
