import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useCanvas, type BlockType } from "@fibr/providers";
import {
  CodeGenerator,
  DEFAULT_GROUP,
  InspectorPanel,
  Overview,
  Palette,
  astResolver,
  groupByParentNode,
} from "@fibr/shared";
import { reactHookFormResolver } from "./resolver";
import { AddFormDialog } from "./AddFormDialog";

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
          add({ block: { ...value, parentNode } });
        }}
      />
      <Overview blocks={blocks} action={<AddFormDialog />} enableDragging />
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

function findParent(context: BlockType[]) {
  const active = context.filter((block) => block.selected);
  const groups = groupByParentNode(context);

  if (active.length === 0) return groups[DEFAULT_GROUP]?.[0].id;

  let current = context.find((value) => value.id === active[0].id);

  while (current?.parentNode != null) {
    current = context.find((value) => value.id === current?.parentNode);
  }

  return current?.id;
}
