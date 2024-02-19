import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import {
  CodeGenerator,
  InspectorPanel,
  Overview,
  Palette,
  astResolver,
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
      <Palette onSelect={(value) => add(value)} />
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
