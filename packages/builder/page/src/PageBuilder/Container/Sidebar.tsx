import {
  BuilderPanel,
  Sidebar as BuilderSidebar,
  ResizeHandle,
  SidebarList,
  SidebarTrigger,
  useBuilder,
  useCanvas,
} from "@fibr/builder";
import { CodeGenerator, Overview, Palette, astResolver } from "@fibr/shared";
import {
  CodeBracketSquareIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Tooltip, TooltipContent, TooltipTrigger, classNames } from "@rafty/ui";

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
          "dark:bg-secondary-950 pointer-events-auto flex h-full bg-white",
          (active === null || !isSidebarOpen) && "w-max",
        )}
      >
        <SidebarList className="dark:border-secondary-800 border-secondary-300 flex flex-col border-r">
          <div className="border-secondary-200 dark:border-secondary-800 w-full overflow-hidden border-r">
            <Palette
              trigger={
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <SidebarTrigger
                        value="palette"
                        className="dark:hover:text-secondary-100 text-secondary-600 dark:text-secondary-400 dark:data-[state=active]:text-secondary-100 data-[disabled]:text-secondary-400 dark:data-[disabled]:text-secondary-600 data-[state=active]:border-primary-500 dark:data-[state=active]:border-primary-300 data-[state=active]:bg-secondary-100 dark:data-[state=active]:bg-secondary-800 -mr-px border-r-2 border-transparent p-2 font-medium transition-colors ease-in-out hover:text-black data-[disabled]:cursor-not-allowed data-[state=active]:text-black"
                      >
                        <Squares2X2Icon className="h-5 w-5 stroke-2" />
                      </SidebarTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">Palette</TooltipContent>
                </Tooltip>
              }
              enableDragging
              onSelect={(value) => add({ blockData: value })}
            />
            <Overview
              trigger={
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <SidebarTrigger
                        value="overview"
                        className="dark:hover:text-secondary-100 text-secondary-600 dark:text-secondary-400 dark:data-[state=active]:text-secondary-100 data-[disabled]:text-secondary-400 dark:data-[disabled]:text-secondary-600 data-[state=active]:border-primary-500 dark:data-[state=active]:border-primary-300 data-[state=active]:bg-secondary-100 dark:data-[state=active]:bg-secondary-800 -mr-px border-r-2 border-transparent p-2 font-medium transition-colors ease-in-out hover:text-black data-[disabled]:cursor-not-allowed data-[state=active]:text-black"
                      >
                        <ListBulletIcon className="h-5 w-5 stroke-2" />
                      </SidebarTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">Overview</TooltipContent>
                </Tooltip>
              }
            />
            <CodeGenerator
              trigger={
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <SidebarTrigger
                        value="code"
                        className="dark:hover:text-secondary-100 text-secondary-600 dark:text-secondary-400 dark:data-[state=active]:text-secondary-100 data-[disabled]:text-secondary-400 dark:data-[disabled]:text-secondary-600 data-[state=active]:border-primary-500 dark:data-[state=active]:border-primary-300 data-[state=active]:bg-secondary-100 dark:data-[state=active]:bg-secondary-800 -mr-px border-r-2 border-transparent p-2 font-medium transition-colors ease-in-out hover:text-black data-[disabled]:cursor-not-allowed data-[state=active]:text-black"
                      >
                        <CodeBracketSquareIcon className="size-5 stroke-2" />
                      </SidebarTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">Code</TooltipContent>
                </Tooltip>
              }
              resolvers={[
                {
                  name: "ast",
                  label: "Ast",
                  language: "js",
                  resolver: astResolver,
                },
              ]}
            />
          </div>
        </SidebarList>
      </BuilderSidebar>
    </BuilderPanel>
  );
}
