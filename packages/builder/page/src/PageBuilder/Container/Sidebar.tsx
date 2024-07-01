import {
  Sidebar as BuilderSidebar,
  SidebarTrigger,
  useCanvas,
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
    <BuilderSidebar>
      <Palette
        trigger={
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <SidebarTrigger value="palette">
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
                <SidebarTrigger value="overview">
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
                <SidebarTrigger value="code">
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
    </BuilderSidebar>
  );
}
