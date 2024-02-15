import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { Overview, Palette, CodeGenerator } from "@fibr/shared";
import { Canvases } from "./Canvases";
import { useCallback } from "react";
import { reactHookFormResolver } from "./resolver";

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
      <CodeGenerator resolver={reactHookFormResolver} />
    </BuilderSidebar>
  );
}