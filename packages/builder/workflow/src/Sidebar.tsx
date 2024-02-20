import { FloatingSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import {
  CodeGenerator,
  InspectorPanel,
  Overview,
  Palette,
  astResolver,
} from "@fibr/shared";

export function Sidebar() {
  const { add, all } = useCanvas(({ add, all }) => ({
    add,
    all,
  }));

  const blocks = all({ filters: { parentNode: "nodes" } });

  return (
    <FloatingSidebar>
      <Palette enableDragging onSelect={(value) => add({ block: value })} />
      <Overview blocks={blocks} />
      <InspectorPanel />
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
    </FloatingSidebar>
  );
}
