import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { CodeGenerator, Overview, Palette, astResolver } from "@fibr/shared";

export function Sidebar() {
  const add = useCanvas(({ add }) => add);

  return (
    <BuilderSidebar>
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
    </BuilderSidebar>
  );
}
