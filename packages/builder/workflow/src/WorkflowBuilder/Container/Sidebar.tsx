import {
  Sidebar as BuilderSidebar,
  ResizeHandle,
  SidebarContent,
  SidebarList,
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
import type { PropsWithChildren } from "react";

export function Sidebar() {
  const add = useCanvas(({ add }) => add);

  return (
    <BuilderSidebar isResizable resizeHandler={<ResizeHandle />}>
      <SidebarContent className="items-center gap-2 py-2 pl-2">
        <SidebarList className="dark:bg-secondary-950 h-max gap-1 rounded-md border-r-0 bg-white p-1 shadow-md">
          <div className="dark:bg-secondary-950 pointer-events-auto h-full w-full overflow-hidden rounded-[inherit] bg-white shadow-[inherit]">
            <Palette
              trigger={
                <Wrapper value="palette" icon={Squares2X2Icon}>
                  Palette
                </Wrapper>
              }
              enableDragging
              onSelect={(value) => add({ blockData: value })}
            />
            <Overview
              trigger={
                <Wrapper value="overview" icon={ListBulletIcon}>
                  Overview
                </Wrapper>
              }
            />
            <CodeGenerator
              trigger={
                <Wrapper value="code" icon={CodeBracketSquareIcon}>
                  Code
                </Wrapper>
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
      </SidebarContent>
    </BuilderSidebar>
  );
}

function Wrapper({
  children,
  icon: Icon,
  value,
}: PropsWithChildren<{
  value: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <SidebarTrigger
            value={value}
            className="hover:text-secondary-700 data-[state=active]:bg-primary-100 data-[state=active]:hover:bg-primary-100 dark:hover:text-secondary-100 text-secondary-600 dark:text-secondary-400 dark:data-[state=active]:text-secondary-100 data-[disabled]:text-secondary-400 dark:data-[disabled]:text-secondary-600 data-[state=active]:border-primary-500 dark:data-[state=active]:border-primary-300 dark:data-[state=active]:bg-secondary-800 -mr-px rounded border-r-2 border-transparent p-2 font-medium  transition-colors ease-in-out data-[disabled]:cursor-not-allowed  data-[orientation=vertical]:border-r-0 data-[state=active]:text-black"
          >
            <Icon className="h-5 w-5 stroke-2" />
          </SidebarTrigger>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">{children}</TooltipContent>
    </Tooltip>
  );
}
