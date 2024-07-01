import {
  Sidebar as BuilderSidebar,
  BuilderPanel,
  SidebarList,
  DEFAULT_GROUP,
  groupByParentNode,
  useCanvas,
  type BlockType,
  SidebarTrigger,
} from "@fibr/builder";
import { CodeGenerator, Overview, Palette, astResolver } from "@fibr/shared";
import { AddFormDialog } from "./AddFormDialog";
import { reactHookFormResolver } from "./resolver";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import {
  CodeBracketSquareIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export function Sidebar() {
  const { schema, addBlock } = useCanvas(({ add, schema }) => ({
    schema,
    addBlock: add,
  }));

  return (
    <BuilderPanel side="left" isResizable>
      <BuilderSidebar>
        <SidebarList>
          <div className="border-secondary-200 dark:border-secondary-800 w-full overflow-hidden border-r">
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
              onSelect={(value) => {
                const parentNode = findParent(schema);
                addBlock({ blockData: { ...value, parentNode } });
              }}
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
              headerAction={<AddFormDialog />}
              enableDragging
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
                {
                  name: "react",
                  label: "React",
                  language: "tsx",
                  resolver: reactHookFormResolver,
                },
              ]}
            />
          </div>
        </SidebarList>
      </BuilderSidebar>
    </BuilderPanel>
  );
}

const GROUP_TYPES = ["canvas", "object"];

function findParent(context: BlockType[]) {
  const active = context.filter((block) => block.selected);
  const groups = groupByParentNode(context);

  const defaultCanvas = groups[DEFAULT_GROUP]?.[0].id;

  if (active.length === 0) return defaultCanvas;

  const current = context.find((value) => value.id === active[0].id);

  if (current && GROUP_TYPES.includes(current.type)) return current.id;

  return current?.parentNode ?? defaultCanvas;
}
