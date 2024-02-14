import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import superjson from "superjson";
import { Overview, Palette, CodeGenerator } from "@fibr/shared";
import { Canvases } from "./Canvases";

export function Sidebar() {
  const {
    schema,
    addBlock,
    getAllBlocks,
    active,
    selectBlock,
    removeBlock,
    moveBlock,
  } = useCanvas(({ block, active, schema }) => ({
    schema,
    active,
    addBlock: block.add,
    getAllBlocks: block.all,
    selectBlock: block.select,
    removeBlock: block.remove,
    moveBlock: block.move,
  }));

  const canvasId = active.canvas;

  const blocks = canvasId ? getAllBlocks(canvasId) : [];

  const code = superjson.stringify(schema);

  return (
    <BuilderSidebar>
      <Palette
        isDisabled={canvasId == null}
        onBlockSelect={(props) => canvasId && addBlock(canvasId, props)}
      />
      <Overview
        blocks={blocks}
        active={active}
        selectBlock={selectBlock}
        removeBlock={(id) => canvasId && removeBlock(canvasId, id)}
        moveBlock={(startBlockId, endblockId) =>
          canvasId && moveBlock(canvasId, startBlockId, endblockId)
        }
      />
      <Canvases />
      <CodeGenerator code={code} />
    </BuilderSidebar>
  );
}
