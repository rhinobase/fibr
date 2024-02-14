import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { CodeGenerator, Palette } from "@fibr/shared";
import superjson from "superjson";

export function Sidebar() {
  const { addBlock, active, schema } = useCanvas(
    ({ block, active, schema }) => ({
      schema,
      active,
      addBlock: block.add,
    }),
  );

  const canvasId = active.canvas;

  const code = superjson.stringify(schema);

  return (
    <BuilderSidebar>
      <Palette
        enableDragging
        isDisabled={canvasId == null}
        onBlockSelect={(props) => canvasId && addBlock(canvasId, props)}
      />
      <CodeGenerator code={code} />
    </BuilderSidebar>
  );
}
