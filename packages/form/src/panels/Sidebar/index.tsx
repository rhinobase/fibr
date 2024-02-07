import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { Canvases } from "./Canvases";
import { Palette, Overview } from "@fibr/shared";
import { useFormBuilder } from "@fibr/providers";
import { CodeGenerator } from "./Code";

export function Sidebar() {
  const {
    addBlock,
    getAllBlocks,
    active,
    selectBlock,
    removeBlock,
    moveBlock,
  } = useFormBuilder(({ block, active }) => ({
    active,
    addBlock: block.add,
    getAllBlocks: block.all,
    selectBlock: block.select,
    removeBlock: block.remove,
    moveBlock: block.move,
  }));

  const canvasId = active.canvas;

  const blocks = canvasId ? getAllBlocks(canvasId) : [];

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
      <CodeGenerator />
    </BuilderSidebar>
  );
}
