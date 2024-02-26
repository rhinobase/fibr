import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { type BlockType, useCanvas } from "@fibr/providers";
import {
  CodeGenerator,
  DEFAULT_GROUP,
  InspectorPanel,
  Overview,
  Palette,
  astResolver,
  groupByParentNode,
} from "@fibr/shared";
import { AddFormDialog } from "./AddFormDialog";
import { reactHookFormResolver } from "./resolver";

export function Sidebar() {
  const { add, blocks } = useCanvas(({ add, schema }) => ({
    add,
    blocks: schema,
  }));

  return (
    <BuilderSidebar>
      <Palette
        onSelect={(value) => {
          const parentNode = findParent(blocks);
          add({ blockData: { ...value, parentNode } });
        }}
      />
      <Overview action={<AddFormDialog />} enableDragging />
      <InspectorPanel />
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
    </BuilderSidebar>
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
