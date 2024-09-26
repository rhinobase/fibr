import {
  type BlockType,
  Sidebar as BuilderSidebar,
  DEFAULT_GROUP,
  ResizeHandle,
  SidebarContent,
  SidebarList,
  SidebarTrigger,
  groupByParentNode,
  useCanvas,
} from "@fibr/builder";
import { CodeGenerator, Overview, Palette, astResolver } from "@fibr/shared";
import {
  CodeBracketSquareIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Toast, Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import toast from "react-hot-toast";
import { AddFormDialog } from "./AddFormDialog";
import { reactHookFormResolver } from "./resolver";

export function Sidebar() {
  const { schema, addBlock } = useCanvas(({ add, schema }) => ({
    schema,
    addBlock: add,
  }));

  return (
    <BuilderSidebar isResizable resizeHandler={<ResizeHandle />}>
      <SidebarContent className="dark:bg-secondary-950 bg-white">
        <SidebarList>
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
              onSelect={(value) => {
                const parentNode = findParent(schema);

                const childs = schema.map((item) => {
                  if (item.parentNode === parentNode) return item.type;
                });

                const parentNodeType = schema.find(
                  (item) => item.id === parentNode,
                )?.type;

                if (parentNodeType === "array" && childs.includes(value.type))
                  toast.custom(() => (
                    <Toast
                      severity="error"
                      title="Type already exists in array field!"
                    />
                  ));
                else addBlock({ blockData: { ...value, parentNode } });
              }}
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
              headerAction={<AddFormDialog />}
              enableDragging
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
      </SidebarContent>
    </BuilderSidebar>
  );
}

const GROUP_TYPES = ["canvas", "object", "array"];

function findParent(context: BlockType[]) {
  const active = context.filter((block) => block.selected);
  const groups = groupByParentNode(context);

  const defaultCanvas = groups[DEFAULT_GROUP]?.[0].id;

  if (active.length === 0) return defaultCanvas;

  const current = context.find((value) => value.id === active[0].id);

  if (current && GROUP_TYPES.includes(current.type)) return current.id;

  return current?.parentNode ?? defaultCanvas;
}
