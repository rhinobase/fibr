import {
  useCanvas,
  Sidebar as BuilderSidebar,
  BuilderPanel,
  SidebarList,
} from "@fibr/builder";
import { CodeGenerator, Overview, Palette, astResolver } from "@fibr/shared";

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
            <Overview />
            <CodeGenerator
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
