import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { Forms } from "./Forms";
import { Palette, Overview } from "@fibr/shared";
import { useBlueprint, useSource } from "../../providers";

export function Sidebar() {
  const blocks = useSource((state) => state.blocks);
  const {
    addBlock,
    getAllBlocks,
    active,
    selectBlock,
    removeBlock,
    moveBlock,
  } = useBlueprint(({ blocks, active }) => ({
    active,
    addBlock: blocks.add,
    getAllBlocks: blocks.all,
    selectBlock: blocks.select,
    removeBlock: blocks.remove,
    moveBlock: blocks.move,
  }));

  const formId = active.form;
  const blockId = active.block;

  const currentFormBlocks = formId ? getAllBlocks(formId) : [];

  return (
    <BuilderSidebar>
      <Palette
        blocks={blocks}
        onBlockSelect={(props) => formId && addBlock(formId, props)}
      />
      <Overview
        formId={formId}
        blocks={currentFormBlocks}
        currentBlock={blockId}
        selectBlock={selectBlock}
        removeBlock={(id) => formId && removeBlock(formId, id)}
        moveBlock={(startBlockId, endblockId) =>
          formId && moveBlock(formId, startBlockId, endblockId)
        }
      />
      <Forms />
    </BuilderSidebar>
  );
}
