import { useCanvas, FloatingSidebar } from "@fibr/builder";
import { CodeGenerator, Overview, Palette, astResolver } from "@fibr/shared";

export function Sidebar() {
  const add = useCanvas(({ add }) => add);

  return (
    <FloatingSidebar>
      <Palette enableDragging onSelect={(value) => add({ blockData: value })} />
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
    </FloatingSidebar>
  );
}
