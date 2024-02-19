import { Sidebar as BuilderSidebar } from "@fibr/builder";
import {
  type BaseBlockWithIdType,
  useCanvas,
  type BaseBlockType,
} from "@fibr/providers";
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

export function Sidebar() {
  const { add, all, active, select, remove, move } = useCanvas(
    ({ add, all, select, remove, move, active }) => ({
      active,
      add,
      all,
      select,
      remove,
      move,
    }),
  );

  const blocks = all();

  return (
    <BuilderSidebar>
      <Palette
        onSelect={(value) => {
          const parentNode = findParent(active, blocks);
          add({ ...value, parentNode });
        }}
      />
      <Overview
        blocks={blocks}
        active={active}
        onSelect={select}
        onDelete={remove}
        onMove={move}
      />
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

function findParent(active: string[], context: BaseBlockWithIdType[]) {
  const groups = groupByParentNode(context);

  if (active.length === 0) return groups[DEFAULT_GROUP]?.[0].id;

  let current = context.find((value) => value.id === active[0]);

  while (current?.parentNode != null) {
    current = context.find((value) => value.id === current?.parentNode);
  }

  return current?.id;
}
