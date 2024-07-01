import {
  useCanvas,
  Sidebar as BuilderSidebar,
  BuilderPanel,
  SidebarList,
  SidebarTrigger,
} from "@fibr/builder";
import { CodeGenerator, Overview, Palette, astResolver } from "@fibr/shared";
import {
  CodeBracketSquareIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";

export function Sidebar() {
  const add = useCanvas(({ add }) => add);

  return (
    <BuilderPanel side="left" isResizable>
      <BuilderSidebar className="items-center gap-2 bg-transparent py-2 pl-2 dark:bg-transparent">
        <SidebarList className="dark:bg-secondary-950 h-max gap-1 rounded-md border-r-0 bg-white p-1 shadow-md">
          <div className="dark:bg-secondary-950 h-full w-full overflow-hidden rounded-md bg-white shadow-md">
            <Palette
              trigger={
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <SidebarTrigger
                        value="palette"
                        className="hover:text-secondary-700 data-[state=active]:bg-primary-100 data-[state=active]:hover:bg-primary-100 rounded p-2 data-[orientation=vertical]:border-r-0"
                      >
                        <Squares2X2Icon className="h-5 w-5 stroke-2" />
                      </SidebarTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Palette</TooltipContent>
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
                        className="hover:text-secondary-700 data-[state=active]:bg-primary-100 data-[state=active]:hover:bg-primary-100 rounded p-2 data-[orientation=vertical]:border-r-0"
                      >
                        <ListBulletIcon className="h-5 w-5 stroke-2" />
                      </SidebarTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Overview</TooltipContent>
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
                        className="hover:text-secondary-700 data-[state=active]:bg-primary-100 data-[state=active]:hover:bg-primary-100 rounded p-2 data-[orientation=vertical]:border-r-0"
                      >
                        <CodeBracketSquareIcon className="size-5 stroke-2" />
                      </SidebarTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Code</TooltipContent>
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
