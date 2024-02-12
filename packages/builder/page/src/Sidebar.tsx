import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { CodeGenerator, Overview, Palette } from "@fibr/shared";

export function Sidebar() {
  const {
    addBlock,
    getAllBlocks,
    active,
    selectBlock,
    removeBlock,
    moveBlock,
  } = useCanvas(({ block, active }) => ({
    active,
    addBlock: block.add,
    getAllBlocks: block.all,
    selectBlock: block.select,
    removeBlock: block.remove,
    moveBlock: block.move,
  }));

  const canvasId = "nodes";

  const blocks = canvasId ? getAllBlocks(canvasId) : [];

  return (
    <BuilderSidebar>
      <Palette
        enableDragging
        isDisabled={canvasId == null}
        onBlockSelect={(props) => canvasId && addBlock(canvasId, props)}
      />
      <Overview
        blocks={blocks}
        active={{ ...active, canvas: canvasId }}
        selectBlock={selectBlock}
        removeBlock={(id) => canvasId && removeBlock(canvasId, id)}
        moveBlock={(startBlockId, endblockId) =>
          canvasId && moveBlock(canvasId, startBlockId, endblockId)
        }
      />
      {/* <Canvases /> */}
      <CodeGenerator />
    </BuilderSidebar>
  );
}
