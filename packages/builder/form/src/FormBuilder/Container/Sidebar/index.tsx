import {
  Sidebar as BuilderSidebar,
  BuilderPanel,
  SidebarList,
  DEFAULT_GROUP,
  groupByParentNode,
  useCanvas,
  type BlockType,
} from "@fibr/builder";
import { CodeGenerator, Overview, Palette, astResolver } from "@fibr/shared";
import { AddFormDialog } from "./AddFormDialog";
import { reactHookFormResolver } from "./resolver";

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
              onSelect={(value) => {
                const parentNode = findParent(schema);
                addBlock({ blockData: { ...value, parentNode } });
              }}
            />
            <Overview headerAction={<AddFormDialog />} enableDragging />
            <CodeGenerator
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
